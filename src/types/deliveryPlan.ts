export interface DeliveryPlan {
    id: string;
    orderDetailId: string;
    inventoryEtd: Date;
    estimatedTime: Date;
    deliveryMethod: 'Customer' | 'Luna';
    generalInfor: {
        sepicalRequest: string;
        rangeOfVehicle: string;
        numberOfVehicle: string;
    };
    departure: {
        address: string;
        contact: string;
        phoneNumber: string;
    };
    destination: {
        address: string;
        contact: string;
        phoneNumber: string;
    };
    containerPackaging: {
        deliveryMethod: string;
        packing: string;
        containerPackeringMethod: string;
        cablesWedges: string;
        lashingWood: string;
        moistureProofBag: string;
    };
    packing: {
        spring: string;
        vclPage: string;
        cartonSheet: string;
        pipe: string;
        banding: string;
        outerWrapper: string;
        innerWrapper: string;
        pallet: string;
        palletHanding: string;
        numberOfHalfMoonbar: string;
        typeOfHalfMoonBar: string;
        typeOfPacking: string;
        brace: string;
    };
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}