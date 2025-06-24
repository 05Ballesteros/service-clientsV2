import { Model, Types } from "mongoose"
import { Direccion_general } from "src/clientes/schemas/Direccion_general.schema";
import { Direccionarea } from "src/clientes/schemas/Direccion_area.schema";
export const registrarDatosExtra = async (data: { nuevaDGeneral?: string, nuevaDArea?: string }, direccionGeneralModel: Model<Direccion_general>,
    direccionAreaModel: Model<Direccionarea>) => {
    let Direccion_General: Types.ObjectId | null = null;
    let direccion_area: Types.ObjectId | null = null;
    if (data.nuevaDGeneral) {
        const nuevaDG = await direccionGeneralModel.create({ Direccion_General: data.nuevaDGeneral });
        Direccion_General = nuevaDG._id as Types.ObjectId;
    }
    if (data.nuevaDArea) {
        const nuevaDA = await direccionAreaModel.create({ direccion_area: data.nuevaDArea });
        direccion_area = nuevaDA._id as Types.ObjectId;
    }
    return { Direccion_General, direccion_area }
}