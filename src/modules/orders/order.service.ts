import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/orders/order.schema';
import { OrderOffer } from './schemas/orders/order-offer.schema';
import { OrderDetail } from './schemas/order-details/order-detail.schema';
import { ProductPlan } from './schemas/order-details/product-plan.schema';
import { DeliveryPlan } from './schemas/order-details/delivery-plan.schema';
import { PaymentPlan } from './schemas/orders/payment-plan.schema';
import { log } from 'console';


@Injectable()
export class OrderService {
	constructor(
		@InjectModel(Order.name) private readonly orderModel: Model<Order>,
		@InjectModel(OrderOffer.name) private readonly orderOfferModel: Model<OrderOffer>,
		@InjectModel(OrderDetail.name) private readonly orderDetailModel: Model<OrderDetail>,
		@InjectModel(ProductPlan.name) private readonly productPlanModel: Model<ProductPlan>,
		@InjectModel(DeliveryPlan.name) private readonly deliveryPlanModel: Model<DeliveryPlan>,
		@InjectModel(PaymentPlan.name) private readonly paymentPlanModel: Model<PaymentPlan>,
	) { }

	async create(data: any): Promise<any> {
		try {
			const results = {};

			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					switch (key) {
						case 'Order':
							results['Order'] = await this.handleOrder(data[key]);
							break;

						case 'OrderDetail':
							results['OrderDetail'] = await this.handleOrderDetail(data[key], results);
							break;

						case 'ProductPlan':
							results['ProductPlan'] = await this.handleProductPlan(data[key], results);
							break;

						case 'DeliveryPlan':
							results['DeliveryPlan'] = await this.handleDeliveryPlan(data[key], results);
							break;

						case 'PaymentPlan':
							results['PaymentPlan'] = await this.handlePaymentPlan(data[key], results);
							break;

						default:
							console.log('Unknown section:', key);
							break;
					}
				}
			}

			return {
				statusCode: HttpStatus.CREATED,
				message: 'Data processed successfully',
				data: results,
			};
		} catch (error) {
			throw new HttpException({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: 'An error occurred while processing the data',
				error: error.message,
			}, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	private async handleOrder(orderData: any) {
		try {
			const newOrder = new this.orderModel({
				ticketId: '19000',
				userId: orderData.userId,
				customerId: orderData.customerId,
				properties: orderData.properties,
				totalPrice: orderData.totalPrice, // Ensure conversion to number
				tax: orderData.tax,
				finalPrice: orderData.finalPrice, // Ensure conversion to number
				orderOffers: [],
			});
			return await newOrder.save();
		} catch (error) {
			console.error('Error saving order:', error);
		}

	}

	private async handleOrderDetail(orderDetailData: any[], results: {}) {
		const orderId = results['Order']._id
		let data_temp = []
		for (const detail of orderDetailData) {
			try {
				const newOrderDetail = new this.orderDetailModel({
					orderId: orderId,
					coilId: detail.coilId,
					prices: detail.prices,
					specialDiscountPrice: detail.specialDiscountPrice,
					specialRebateOffer: detail.specialRebateOffer,
					exchange: detail.exchange,
					finalPrice: detail.finalPrice,
					totalPrice: detail.totalPrice,
				});

				await newOrderDetail.save();
				data_temp.push(newOrderDetail)

			} catch (error) {
				console.error('Error saving details:', error);
			}
		}
		return data_temp
	}

	private async handleProductPlan(productPlanData: any[], results: {}) {
		let data_temp = []

		productPlanData.forEach(async (plan, index) => {
			try {
				const orderDetailId = results['OrderDetail'][index]._id

				const newProductPlan = new this.productPlanModel({
					orderDetailId: orderDetailId,
					estimatedTime: new Date(plan.estimatedTime),
					tolerances: plan.tolerances,
					physicoMedical: plan.physicoMedical,
					containerPacking: plan.containerPacking,
					otherRequirements: plan.otherRequirements,
				});
				await newProductPlan.save()
				data_temp.push(newProductPlan)
			} catch (error) {
				console.error('Error saving:', error);
			}
		})
		console.log(data_temp);
		return data_temp
	}

	private async handleDeliveryPlan(deliveryPlanData: any[], results: {}) {
		let data_temp = []
		deliveryPlanData.forEach(async (item, index) => {
			try {
				const orderDetailId = results['OrderDetail'][index]._id
				const newDeliveryPlan = new this.deliveryPlanModel({
					orderDetailId: orderDetailId,
					inventoryEtd: new Date(item.inventoryEtd),
					estimatedTime: new Date(item.estimatedTime),
					deliveryMethod: item.deliveryMethod,
					generalInfo: item.generalInfo,
					departure: item.departure,
					destination: item.destination,
					containerPackaging: item.containerPackaging,
					packing: item.packing,
				});
				await newDeliveryPlan.save();
				data_temp.push(newDeliveryPlan)
			}
			catch (error) {
				console.error('Error saving delivery plan:', error);
			}
		})

		return data_temp
	}

	private async handlePaymentPlan(paymentPlanData: any[], results: {}) {
		let data_temp = []

		const orderId = results['Order']._id
		for (const plan of paymentPlanData) {
			try {
				const newPaymentPlan = new this.paymentPlanModel({
					orderId: orderId,
					totalPrice: plan.totalPrice,
					plans: plan.plans.map(p => ({
						name: p.name,
						paymentTerm: p.paymentTerm,
						schedules: p.schedules.map(s => ({
							paymentDate: new Date(s.paymentDate),
							paymentAmount: s.paymentAmount,
							paymentType: s.paymentType,
							isPaid: s.isPaid,
						})),
					})),
				});

				await newPaymentPlan.save();
				data_temp.push(newPaymentPlan)
			} catch (error) {
				console.log('PaymentPlan saved:', error);
			}
		}
		return data_temp
	}

	private async processOrderOffers(offers: any[]): Promise<OrderOffer[]> {
		const processedOffers: OrderOffer[] = [];
		for (const offerData of offers) {
			const newOffer = new this.orderOfferModel({
				note: offerData.note,
				reply: offerData.reply,
				file: offerData.file,
				isAproval: offerData.isAproval,
				isDeleted: offerData.isDeleted,
			});
			await newOffer.save();
			processedOffers.push(newOffer);
		}
		return processedOffers;
	}
}
