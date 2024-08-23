export interface Item {
    id: string;
    itemId: string;
    group: {
        groupLevel1: string;
        groupLevel2: string;
        groupLevel3: string;
    };
    grade: string;
    standart: string;
    thickness: {
        baseSteelThickness: string;
        postGalvanizationThickness: string;
        postPaintThickness: string;
        pipeWallThickness: string;
    };
    width: string;
    diameter: string;
    color: {
        colorCode: string;
        primaryPaintColorCode: string;
        backPaintColorCode: string;
    };
    length: string;
    shape: string;
    surfaceCoating: string;
    glossine: string;
    conversionRatio: number;
    dimensional: {
        upper: string;
        lower: string;
    };
    description: {
        shortDescription: string;
        overviewLongDescription: string;
        tradeName: string;
    };
    alloyCode: string;
    revision: {
        version: string;
        track: string;
    };
    stocked: boolean;
    showInDropdownList: string;
    um: string;
    source: string;
    code: {
        alloyCode: string;
        productCode: string;
        abcCode: string;
    };
    cost: {
        costType: string;
        costMethod: string;
    };
    other: {
        activeForDataIntegration: boolean;
        acceptRequirement: boolean;
        passRequirement: boolean;
        lotTrack: boolean;
        reservable: boolean;
    };
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}