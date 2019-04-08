// Eventually this will become a library to craft various rest ops.
import {
    IClientJoin,
    IDocumentMessage,
    IDocumentSystemMessage,
    MessageType,
} from "@prague/container-definitions";
import * as core from "@prague/services-core";

export interface IMapSetOperation {
    op: string;
    path: string;
    value: string;
}

// We only support top level keys in root map for now.
export function craftMapSet(op: IMapSetOperation) {
    const opContent = {
        address: "root",
        contents: {
            key: op.path,
            type: "set",
            value: {
                type: "Plain",
                value: op.value,
            },
        },
    };

    const opMessage = {
        address: "root",
        contents: {
            clientSequenceNumber: 1,
            content: opContent,
            referenceSequenceNumber: 1,
            type: "op",
        },
    };

    return opMessage;
}

export function craftClientJoinLeaveMessage(
    tenantId: string,
    documentId: string,
    contents: IClientJoin | string): core.IRawOperationMessage {
    const type = (typeof contents === "string") ? MessageType.ClientLeave : MessageType.ClientJoin;
    const operation: IDocumentSystemMessage = {
        clientSequenceNumber: -1,
        contents: null,
        data: JSON.stringify(contents),
        referenceSequenceNumber: -1,
        traces: [],
        type,
    };

    const message: core.IRawOperationMessage = {
        clientId: null,
        documentId,
        operation,
        tenantId,
        timestamp: Date.now(),
        type: core.RawOperationType,
    };

    return message;
}

export function craftOpMessage(
    tenantId: string,
    documentId: string,
    clientId: string,
    contents: string,
    clientSequenceNumber: number): core.IRawOperationMessage {
    const operation: IDocumentMessage = {
        clientSequenceNumber,
        contents,
        referenceSequenceNumber: -1,
        traces: [],
        type: MessageType.Operation,
    };

    const message: core.IRawOperationMessage = {
        clientId,
        documentId,
        operation,
        tenantId,
        timestamp: Date.now(),
        type: core.RawOperationType,
    };

    return message;
}
