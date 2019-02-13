import { ISharedObjectExtension } from "@prague/api-definitions";
import { ISequencedDocumentMessage } from "@prague/container-definitions";
import { IDistributedObjectServices, IRuntime } from "@prague/runtime-definitions";
import { Cell } from "./cell";
import { ICell } from "./interfaces";

/**
 * The extension that defines the map
 */
export class CellExtension implements ISharedObjectExtension {
    public static Type = "https://graph.microsoft.com/types/cell";

    public type: string = CellExtension.Type;

    public async load(
        document: IRuntime,
        id: string,
        minimumSequenceNumber: number,
        messages: ISequencedDocumentMessage[],
        services: IDistributedObjectServices,
        headerOrigin: string): Promise<ICell> {

        const cell = new Cell(id, document);
        await cell.load(minimumSequenceNumber, messages, headerOrigin, services);
        return cell;
    }

    public create(document: IRuntime, id: string): ICell {
        const cell = new Cell(id, document);
        cell.initializeLocal();
        return cell;
    }
}
