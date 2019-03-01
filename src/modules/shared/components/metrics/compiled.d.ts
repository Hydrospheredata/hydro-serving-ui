import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace hydrosphere. */
export namespace hydrosphere {

    /** Namespace monitoring. */
    namespace monitoring {

        /** Properties of an ExecutionError. */
        interface IExecutionError {

            /** ExecutionError errorMessage */
            errorMessage?: (string|null);
        }

        /** Represents an ExecutionError. */
        class ExecutionError implements IExecutionError {

            /**
             * Constructs a new ExecutionError.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.monitoring.IExecutionError);

            /** ExecutionError errorMessage. */
            public errorMessage: string;

            /**
             * Creates a new ExecutionError instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExecutionError instance
             */
            public static create(properties?: hydrosphere.monitoring.IExecutionError): hydrosphere.monitoring.ExecutionError;

            /**
             * Encodes the specified ExecutionError message. Does not implicitly {@link hydrosphere.monitoring.ExecutionError.verify|verify} messages.
             * @param message ExecutionError message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.monitoring.IExecutionError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExecutionError message, length delimited. Does not implicitly {@link hydrosphere.monitoring.ExecutionError.verify|verify} messages.
             * @param message ExecutionError message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.monitoring.IExecutionError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExecutionError message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExecutionError
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.monitoring.ExecutionError;

            /**
             * Decodes an ExecutionError message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExecutionError
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.monitoring.ExecutionError;

            /**
             * Verifies an ExecutionError message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExecutionError message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExecutionError
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.monitoring.ExecutionError;

            /**
             * Creates a plain object from an ExecutionError message. Also converts values to other types if specified.
             * @param message ExecutionError
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.monitoring.ExecutionError, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExecutionError to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TraceData. */
        interface ITraceData {

            /** TraceData ts */
            ts?: (number|Long|null);

            /** TraceData uid */
            uid?: (number|Long|null);
        }

        /** Represents a TraceData. */
        class TraceData implements ITraceData {

            /**
             * Constructs a new TraceData.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.monitoring.ITraceData);

            /** TraceData ts. */
            public ts: (number|Long);

            /** TraceData uid. */
            public uid: (number|Long);

            /**
             * Creates a new TraceData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TraceData instance
             */
            public static create(properties?: hydrosphere.monitoring.ITraceData): hydrosphere.monitoring.TraceData;

            /**
             * Encodes the specified TraceData message. Does not implicitly {@link hydrosphere.monitoring.TraceData.verify|verify} messages.
             * @param message TraceData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.monitoring.ITraceData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TraceData message, length delimited. Does not implicitly {@link hydrosphere.monitoring.TraceData.verify|verify} messages.
             * @param message TraceData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.monitoring.ITraceData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TraceData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TraceData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.monitoring.TraceData;

            /**
             * Decodes a TraceData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TraceData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.monitoring.TraceData;

            /**
             * Verifies a TraceData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TraceData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TraceData
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.monitoring.TraceData;

            /**
             * Creates a plain object from a TraceData message. Also converts values to other types if specified.
             * @param message TraceData
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.monitoring.TraceData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TraceData to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ExecutionMetadata. */
        interface IExecutionMetadata {

            /** ExecutionMetadata applicationId */
            applicationId?: (number|Long|null);

            /** ExecutionMetadata stageId */
            stageId?: (string|null);

            /** ExecutionMetadata modelVersionId */
            modelVersionId?: (number|Long|null);

            /** ExecutionMetadata signatureName */
            signatureName?: (string|null);

            /** ExecutionMetadata requestId */
            requestId?: (string|null);

            /** ExecutionMetadata applicationRequestId */
            applicationRequestId?: (string|null);

            /** ExecutionMetadata applicationNamespace */
            applicationNamespace?: (string|null);

            /** ExecutionMetadata modelName */
            modelName?: (string|null);

            /** ExecutionMetadata traceData */
            traceData?: (hydrosphere.monitoring.ITraceData|null);
        }

        /** Represents an ExecutionMetadata. */
        class ExecutionMetadata implements IExecutionMetadata {

            /**
             * Constructs a new ExecutionMetadata.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.monitoring.IExecutionMetadata);

            /** ExecutionMetadata applicationId. */
            public applicationId: (number|Long);

            /** ExecutionMetadata stageId. */
            public stageId: string;

            /** ExecutionMetadata modelVersionId. */
            public modelVersionId: (number|Long);

            /** ExecutionMetadata signatureName. */
            public signatureName: string;

            /** ExecutionMetadata requestId. */
            public requestId: string;

            /** ExecutionMetadata applicationRequestId. */
            public applicationRequestId: string;

            /** ExecutionMetadata applicationNamespace. */
            public applicationNamespace: string;

            /** ExecutionMetadata modelName. */
            public modelName: string;

            /** ExecutionMetadata traceData. */
            public traceData?: (hydrosphere.monitoring.ITraceData|null);

            /**
             * Creates a new ExecutionMetadata instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExecutionMetadata instance
             */
            public static create(properties?: hydrosphere.monitoring.IExecutionMetadata): hydrosphere.monitoring.ExecutionMetadata;

            /**
             * Encodes the specified ExecutionMetadata message. Does not implicitly {@link hydrosphere.monitoring.ExecutionMetadata.verify|verify} messages.
             * @param message ExecutionMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.monitoring.IExecutionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExecutionMetadata message, length delimited. Does not implicitly {@link hydrosphere.monitoring.ExecutionMetadata.verify|verify} messages.
             * @param message ExecutionMetadata message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.monitoring.IExecutionMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExecutionMetadata message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExecutionMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.monitoring.ExecutionMetadata;

            /**
             * Decodes an ExecutionMetadata message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExecutionMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.monitoring.ExecutionMetadata;

            /**
             * Verifies an ExecutionMetadata message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExecutionMetadata message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExecutionMetadata
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.monitoring.ExecutionMetadata;

            /**
             * Creates a plain object from an ExecutionMetadata message. Also converts values to other types if specified.
             * @param message ExecutionMetadata
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.monitoring.ExecutionMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExecutionMetadata to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ExecutionInformation. */
        interface IExecutionInformation {

            /** ExecutionInformation request */
            request?: (hydrosphere.tensorflow.serving.IPredictRequest|null);

            /** ExecutionInformation error */
            error?: (hydrosphere.monitoring.IExecutionError|null);

            /** ExecutionInformation response */
            response?: (hydrosphere.tensorflow.serving.IPredictResponse|null);

            /** ExecutionInformation metadata */
            metadata?: (hydrosphere.monitoring.IExecutionMetadata|null);
        }

        /** Represents an ExecutionInformation. */
        class ExecutionInformation implements IExecutionInformation {

            /**
             * Constructs a new ExecutionInformation.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.monitoring.IExecutionInformation);

            /** ExecutionInformation request. */
            public request?: (hydrosphere.tensorflow.serving.IPredictRequest|null);

            /** ExecutionInformation error. */
            public error?: (hydrosphere.monitoring.IExecutionError|null);

            /** ExecutionInformation response. */
            public response?: (hydrosphere.tensorflow.serving.IPredictResponse|null);

            /** ExecutionInformation metadata. */
            public metadata?: (hydrosphere.monitoring.IExecutionMetadata|null);

            /** ExecutionInformation responseOrError. */
            public responseOrError?: ("error"|"response");

            /**
             * Creates a new ExecutionInformation instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExecutionInformation instance
             */
            public static create(properties?: hydrosphere.monitoring.IExecutionInformation): hydrosphere.monitoring.ExecutionInformation;

            /**
             * Encodes the specified ExecutionInformation message. Does not implicitly {@link hydrosphere.monitoring.ExecutionInformation.verify|verify} messages.
             * @param message ExecutionInformation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.monitoring.IExecutionInformation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExecutionInformation message, length delimited. Does not implicitly {@link hydrosphere.monitoring.ExecutionInformation.verify|verify} messages.
             * @param message ExecutionInformation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.monitoring.IExecutionInformation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExecutionInformation message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExecutionInformation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.monitoring.ExecutionInformation;

            /**
             * Decodes an ExecutionInformation message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExecutionInformation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.monitoring.ExecutionInformation;

            /**
             * Verifies an ExecutionInformation message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExecutionInformation message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExecutionInformation
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.monitoring.ExecutionInformation;

            /**
             * Creates a plain object from an ExecutionInformation message. Also converts values to other types if specified.
             * @param message ExecutionInformation
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.monitoring.ExecutionInformation, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExecutionInformation to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a MonitoringService */
        class MonitoringService extends $protobuf.rpc.Service {

            /**
             * Constructs a new MonitoringService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Creates new MonitoringService service using the specified rpc implementation.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             * @returns RPC service. Useful where requests and/or responses are streamed.
             */
            public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): MonitoringService;

            /**
             * Calls Analyze.
             * @param request ExecutionInformation message or plain object
             * @param callback Node-style callback called with the error, if any, and Empty
             */
            public analyze(request: hydrosphere.monitoring.IExecutionInformation, callback: hydrosphere.monitoring.MonitoringService.AnalyzeCallback): void;

            /**
             * Calls Analyze.
             * @param request ExecutionInformation message or plain object
             * @returns Promise
             */
            public analyze(request: hydrosphere.monitoring.IExecutionInformation): Promise<google.protobuf.Empty>;
        }

        namespace MonitoringService {

            /**
             * Callback as used by {@link hydrosphere.monitoring.MonitoringService#analyze}.
             * @param error Error, if any
             * @param [response] Empty
             */
            type AnalyzeCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;
        }
    }

    /** Namespace manager. */
    namespace manager {

        /** Properties of a KafkaError. */
        interface IKafkaError {

            /** KafkaError errorMessage */
            errorMessage?: (string|null);

            /** KafkaError lastKnownRequest */
            lastKnownRequest?: (hydrosphere.tensorflow.serving.IPredictRequest|null);
        }

        /** Represents a KafkaError. */
        class KafkaError implements IKafkaError {

            /**
             * Constructs a new KafkaError.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IKafkaError);

            /** KafkaError errorMessage. */
            public errorMessage: string;

            /** KafkaError lastKnownRequest. */
            public lastKnownRequest?: (hydrosphere.tensorflow.serving.IPredictRequest|null);

            /**
             * Creates a new KafkaError instance using the specified properties.
             * @param [properties] Properties to set
             * @returns KafkaError instance
             */
            public static create(properties?: hydrosphere.manager.IKafkaError): hydrosphere.manager.KafkaError;

            /**
             * Encodes the specified KafkaError message. Does not implicitly {@link hydrosphere.manager.KafkaError.verify|verify} messages.
             * @param message KafkaError message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IKafkaError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified KafkaError message, length delimited. Does not implicitly {@link hydrosphere.manager.KafkaError.verify|verify} messages.
             * @param message KafkaError message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IKafkaError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a KafkaError message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns KafkaError
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.KafkaError;

            /**
             * Decodes a KafkaError message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns KafkaError
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.KafkaError;

            /**
             * Verifies a KafkaError message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a KafkaError message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns KafkaError
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.KafkaError;

            /**
             * Creates a plain object from a KafkaError message. Also converts values to other types if specified.
             * @param message KafkaError
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.KafkaError, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this KafkaError to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a KafkaMessageLocation. */
        interface IKafkaMessageLocation {

            /** KafkaMessageLocation sourceTopic */
            sourceTopic?: (string|null);

            /** KafkaMessageLocation consumerId */
            consumerId?: (string|null);

            /** KafkaMessageLocation offset */
            offset?: (number|Long|null);

            /** KafkaMessageLocation partition */
            partition?: (number|null);
        }

        /** Represents a KafkaMessageLocation. */
        class KafkaMessageLocation implements IKafkaMessageLocation {

            /**
             * Constructs a new KafkaMessageLocation.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IKafkaMessageLocation);

            /** KafkaMessageLocation sourceTopic. */
            public sourceTopic: string;

            /** KafkaMessageLocation consumerId. */
            public consumerId: string;

            /** KafkaMessageLocation offset. */
            public offset: (number|Long);

            /** KafkaMessageLocation partition. */
            public partition: number;

            /**
             * Creates a new KafkaMessageLocation instance using the specified properties.
             * @param [properties] Properties to set
             * @returns KafkaMessageLocation instance
             */
            public static create(properties?: hydrosphere.manager.IKafkaMessageLocation): hydrosphere.manager.KafkaMessageLocation;

            /**
             * Encodes the specified KafkaMessageLocation message. Does not implicitly {@link hydrosphere.manager.KafkaMessageLocation.verify|verify} messages.
             * @param message KafkaMessageLocation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IKafkaMessageLocation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified KafkaMessageLocation message, length delimited. Does not implicitly {@link hydrosphere.manager.KafkaMessageLocation.verify|verify} messages.
             * @param message KafkaMessageLocation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IKafkaMessageLocation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a KafkaMessageLocation message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns KafkaMessageLocation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.KafkaMessageLocation;

            /**
             * Decodes a KafkaMessageLocation message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns KafkaMessageLocation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.KafkaMessageLocation;

            /**
             * Verifies a KafkaMessageLocation message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a KafkaMessageLocation message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns KafkaMessageLocation
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.KafkaMessageLocation;

            /**
             * Creates a plain object from a KafkaMessageLocation message. Also converts values to other types if specified.
             * @param message KafkaMessageLocation
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.KafkaMessageLocation, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this KafkaMessageLocation to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a KafkaMessageMeta. */
        interface IKafkaMessageMeta {

            /** KafkaMessageMeta traceId */
            traceId?: (string|null);

            /** KafkaMessageMeta applicationId */
            applicationId?: (string|null);

            /** KafkaMessageMeta stageId */
            stageId?: (string|null);

            /** KafkaMessageMeta stageName */
            stageName?: (string|null);

            /** KafkaMessageMeta location */
            location?: (hydrosphere.manager.IKafkaMessageLocation|null);
        }

        /** Represents a KafkaMessageMeta. */
        class KafkaMessageMeta implements IKafkaMessageMeta {

            /**
             * Constructs a new KafkaMessageMeta.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IKafkaMessageMeta);

            /** KafkaMessageMeta traceId. */
            public traceId: string;

            /** KafkaMessageMeta applicationId. */
            public applicationId: string;

            /** KafkaMessageMeta stageId. */
            public stageId: string;

            /** KafkaMessageMeta stageName. */
            public stageName: string;

            /** KafkaMessageMeta location. */
            public location?: (hydrosphere.manager.IKafkaMessageLocation|null);

            /**
             * Creates a new KafkaMessageMeta instance using the specified properties.
             * @param [properties] Properties to set
             * @returns KafkaMessageMeta instance
             */
            public static create(properties?: hydrosphere.manager.IKafkaMessageMeta): hydrosphere.manager.KafkaMessageMeta;

            /**
             * Encodes the specified KafkaMessageMeta message. Does not implicitly {@link hydrosphere.manager.KafkaMessageMeta.verify|verify} messages.
             * @param message KafkaMessageMeta message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IKafkaMessageMeta, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified KafkaMessageMeta message, length delimited. Does not implicitly {@link hydrosphere.manager.KafkaMessageMeta.verify|verify} messages.
             * @param message KafkaMessageMeta message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IKafkaMessageMeta, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a KafkaMessageMeta message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns KafkaMessageMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.KafkaMessageMeta;

            /**
             * Decodes a KafkaMessageMeta message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns KafkaMessageMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.KafkaMessageMeta;

            /**
             * Verifies a KafkaMessageMeta message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a KafkaMessageMeta message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns KafkaMessageMeta
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.KafkaMessageMeta;

            /**
             * Creates a plain object from a KafkaMessageMeta message. Also converts values to other types if specified.
             * @param message KafkaMessageMeta
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.KafkaMessageMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this KafkaMessageMeta to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a KafkaServingMessage. */
        interface IKafkaServingMessage {

            /** KafkaServingMessage error */
            error?: (hydrosphere.manager.IKafkaError|null);

            /** KafkaServingMessage request */
            request?: (hydrosphere.tensorflow.serving.IPredictRequest|null);

            /** KafkaServingMessage meta */
            meta?: (hydrosphere.manager.IKafkaMessageMeta|null);
        }

        /** Represents a KafkaServingMessage. */
        class KafkaServingMessage implements IKafkaServingMessage {

            /**
             * Constructs a new KafkaServingMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IKafkaServingMessage);

            /** KafkaServingMessage error. */
            public error?: (hydrosphere.manager.IKafkaError|null);

            /** KafkaServingMessage request. */
            public request?: (hydrosphere.tensorflow.serving.IPredictRequest|null);

            /** KafkaServingMessage meta. */
            public meta?: (hydrosphere.manager.IKafkaMessageMeta|null);

            /** KafkaServingMessage requestOrError. */
            public requestOrError?: ("error"|"request");

            /**
             * Creates a new KafkaServingMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns KafkaServingMessage instance
             */
            public static create(properties?: hydrosphere.manager.IKafkaServingMessage): hydrosphere.manager.KafkaServingMessage;

            /**
             * Encodes the specified KafkaServingMessage message. Does not implicitly {@link hydrosphere.manager.KafkaServingMessage.verify|verify} messages.
             * @param message KafkaServingMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IKafkaServingMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified KafkaServingMessage message, length delimited. Does not implicitly {@link hydrosphere.manager.KafkaServingMessage.verify|verify} messages.
             * @param message KafkaServingMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IKafkaServingMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a KafkaServingMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns KafkaServingMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.KafkaServingMessage;

            /**
             * Decodes a KafkaServingMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns KafkaServingMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.KafkaServingMessage;

            /**
             * Verifies a KafkaServingMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a KafkaServingMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns KafkaServingMessage
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.KafkaServingMessage;

            /**
             * Creates a plain object from a KafkaServingMessage message. Also converts values to other types if specified.
             * @param message KafkaServingMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.KafkaServingMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this KafkaServingMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ExecutionService. */
        interface IExecutionService {

            /** ExecutionService modelVersion */
            modelVersion?: (hydrosphere.manager.IModelVersion|null);

            /** ExecutionService weight */
            weight?: (number|null);
        }

        /** Represents an ExecutionService. */
        class ExecutionService implements IExecutionService {

            /**
             * Constructs a new ExecutionService.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IExecutionService);

            /** ExecutionService modelVersion. */
            public modelVersion?: (hydrosphere.manager.IModelVersion|null);

            /** ExecutionService weight. */
            public weight: number;

            /**
             * Creates a new ExecutionService instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExecutionService instance
             */
            public static create(properties?: hydrosphere.manager.IExecutionService): hydrosphere.manager.ExecutionService;

            /**
             * Encodes the specified ExecutionService message. Does not implicitly {@link hydrosphere.manager.ExecutionService.verify|verify} messages.
             * @param message ExecutionService message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IExecutionService, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExecutionService message, length delimited. Does not implicitly {@link hydrosphere.manager.ExecutionService.verify|verify} messages.
             * @param message ExecutionService message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IExecutionService, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExecutionService message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExecutionService
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.ExecutionService;

            /**
             * Decodes an ExecutionService message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExecutionService
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.ExecutionService;

            /**
             * Verifies an ExecutionService message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExecutionService message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExecutionService
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.ExecutionService;

            /**
             * Creates a plain object from an ExecutionService message. Also converts values to other types if specified.
             * @param message ExecutionService
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.ExecutionService, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExecutionService to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ExecutionStage. */
        interface IExecutionStage {

            /** ExecutionStage stageId */
            stageId?: (string|null);

            /** ExecutionStage signature */
            signature?: (hydrosphere.contract.IModelSignature|null);

            /** ExecutionStage services */
            services?: (hydrosphere.manager.IExecutionService[]|null);
        }

        /** Represents an ExecutionStage. */
        class ExecutionStage implements IExecutionStage {

            /**
             * Constructs a new ExecutionStage.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IExecutionStage);

            /** ExecutionStage stageId. */
            public stageId: string;

            /** ExecutionStage signature. */
            public signature?: (hydrosphere.contract.IModelSignature|null);

            /** ExecutionStage services. */
            public services: hydrosphere.manager.IExecutionService[];

            /**
             * Creates a new ExecutionStage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExecutionStage instance
             */
            public static create(properties?: hydrosphere.manager.IExecutionStage): hydrosphere.manager.ExecutionStage;

            /**
             * Encodes the specified ExecutionStage message. Does not implicitly {@link hydrosphere.manager.ExecutionStage.verify|verify} messages.
             * @param message ExecutionStage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IExecutionStage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExecutionStage message, length delimited. Does not implicitly {@link hydrosphere.manager.ExecutionStage.verify|verify} messages.
             * @param message ExecutionStage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IExecutionStage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExecutionStage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExecutionStage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.ExecutionStage;

            /**
             * Decodes an ExecutionStage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExecutionStage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.ExecutionStage;

            /**
             * Verifies an ExecutionStage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExecutionStage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExecutionStage
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.ExecutionStage;

            /**
             * Creates a plain object from an ExecutionStage message. Also converts values to other types if specified.
             * @param message ExecutionStage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.ExecutionStage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExecutionStage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ExecutionGraph. */
        interface IExecutionGraph {

            /** ExecutionGraph stages */
            stages?: (hydrosphere.manager.IExecutionStage[]|null);
        }

        /** Represents an ExecutionGraph. */
        class ExecutionGraph implements IExecutionGraph {

            /**
             * Constructs a new ExecutionGraph.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IExecutionGraph);

            /** ExecutionGraph stages. */
            public stages: hydrosphere.manager.IExecutionStage[];

            /**
             * Creates a new ExecutionGraph instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExecutionGraph instance
             */
            public static create(properties?: hydrosphere.manager.IExecutionGraph): hydrosphere.manager.ExecutionGraph;

            /**
             * Encodes the specified ExecutionGraph message. Does not implicitly {@link hydrosphere.manager.ExecutionGraph.verify|verify} messages.
             * @param message ExecutionGraph message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IExecutionGraph, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExecutionGraph message, length delimited. Does not implicitly {@link hydrosphere.manager.ExecutionGraph.verify|verify} messages.
             * @param message ExecutionGraph message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IExecutionGraph, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExecutionGraph message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExecutionGraph
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.ExecutionGraph;

            /**
             * Decodes an ExecutionGraph message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExecutionGraph
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.ExecutionGraph;

            /**
             * Verifies an ExecutionGraph message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExecutionGraph message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExecutionGraph
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.ExecutionGraph;

            /**
             * Creates a plain object from an ExecutionGraph message. Also converts values to other types if specified.
             * @param message ExecutionGraph
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.ExecutionGraph, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExecutionGraph to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a KafkaStreaming. */
        interface IKafkaStreaming {

            /** KafkaStreaming consumerId */
            consumerId?: (string|null);

            /** KafkaStreaming sourceTopic */
            sourceTopic?: (string|null);

            /** KafkaStreaming destinationTopic */
            destinationTopic?: (string|null);

            /** KafkaStreaming errorTopic */
            errorTopic?: (string|null);
        }

        /** Represents a KafkaStreaming. */
        class KafkaStreaming implements IKafkaStreaming {

            /**
             * Constructs a new KafkaStreaming.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IKafkaStreaming);

            /** KafkaStreaming consumerId. */
            public consumerId: string;

            /** KafkaStreaming sourceTopic. */
            public sourceTopic: string;

            /** KafkaStreaming destinationTopic. */
            public destinationTopic: string;

            /** KafkaStreaming errorTopic. */
            public errorTopic: string;

            /**
             * Creates a new KafkaStreaming instance using the specified properties.
             * @param [properties] Properties to set
             * @returns KafkaStreaming instance
             */
            public static create(properties?: hydrosphere.manager.IKafkaStreaming): hydrosphere.manager.KafkaStreaming;

            /**
             * Encodes the specified KafkaStreaming message. Does not implicitly {@link hydrosphere.manager.KafkaStreaming.verify|verify} messages.
             * @param message KafkaStreaming message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IKafkaStreaming, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified KafkaStreaming message, length delimited. Does not implicitly {@link hydrosphere.manager.KafkaStreaming.verify|verify} messages.
             * @param message KafkaStreaming message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IKafkaStreaming, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a KafkaStreaming message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns KafkaStreaming
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.KafkaStreaming;

            /**
             * Decodes a KafkaStreaming message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns KafkaStreaming
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.KafkaStreaming;

            /**
             * Verifies a KafkaStreaming message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a KafkaStreaming message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns KafkaStreaming
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.KafkaStreaming;

            /**
             * Creates a plain object from a KafkaStreaming message. Also converts values to other types if specified.
             * @param message KafkaStreaming
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.KafkaStreaming, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this KafkaStreaming to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Application. */
        interface IApplication {

            /** Application id */
            id?: (number|Long|null);

            /** Application name */
            name?: (string|null);

            /** Application contract */
            contract?: (hydrosphere.contract.IModelContract|null);

            /** Application executionGraph */
            executionGraph?: (hydrosphere.manager.IExecutionGraph|null);

            /** Application kafkaStreaming */
            kafkaStreaming?: (hydrosphere.manager.IKafkaStreaming[]|null);

            /** Application namespace */
            namespace?: (string|null);
        }

        /** Represents an Application. */
        class Application implements IApplication {

            /**
             * Constructs a new Application.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IApplication);

            /** Application id. */
            public id: (number|Long);

            /** Application name. */
            public name: string;

            /** Application contract. */
            public contract?: (hydrosphere.contract.IModelContract|null);

            /** Application executionGraph. */
            public executionGraph?: (hydrosphere.manager.IExecutionGraph|null);

            /** Application kafkaStreaming. */
            public kafkaStreaming: hydrosphere.manager.IKafkaStreaming[];

            /** Application namespace. */
            public namespace: string;

            /**
             * Creates a new Application instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Application instance
             */
            public static create(properties?: hydrosphere.manager.IApplication): hydrosphere.manager.Application;

            /**
             * Encodes the specified Application message. Does not implicitly {@link hydrosphere.manager.Application.verify|verify} messages.
             * @param message Application message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IApplication, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Application message, length delimited. Does not implicitly {@link hydrosphere.manager.Application.verify|verify} messages.
             * @param message Application message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IApplication, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Application message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Application
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.Application;

            /**
             * Decodes an Application message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Application
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.Application;

            /**
             * Verifies an Application message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Application message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Application
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.Application;

            /**
             * Creates a plain object from an Application message. Also converts values to other types if specified.
             * @param message Application
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.Application, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Application to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** DataProfileType enum. */
        enum DataProfileType {
            NONE = 0,
            CATEGORICAL = 1,
            NOMINAL = 11,
            ORIDNAL = 12,
            NUMERICAL = 2,
            CONTINUOUS = 21,
            INTERVAL = 22,
            RATIO = 23,
            IMAGE = 3,
            VIDEO = 4,
            AUDIO = 5,
            TEXT = 6
        }

        /** Properties of a GetVersionRequest. */
        interface IGetVersionRequest {

            /** GetVersionRequest id */
            id?: (number|Long|null);
        }

        /** Represents a GetVersionRequest. */
        class GetVersionRequest implements IGetVersionRequest {

            /**
             * Constructs a new GetVersionRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IGetVersionRequest);

            /** GetVersionRequest id. */
            public id: (number|Long);

            /**
             * Creates a new GetVersionRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetVersionRequest instance
             */
            public static create(properties?: hydrosphere.manager.IGetVersionRequest): hydrosphere.manager.GetVersionRequest;

            /**
             * Encodes the specified GetVersionRequest message. Does not implicitly {@link hydrosphere.manager.GetVersionRequest.verify|verify} messages.
             * @param message GetVersionRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IGetVersionRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetVersionRequest message, length delimited. Does not implicitly {@link hydrosphere.manager.GetVersionRequest.verify|verify} messages.
             * @param message GetVersionRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IGetVersionRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetVersionRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetVersionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.GetVersionRequest;

            /**
             * Decodes a GetVersionRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetVersionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.GetVersionRequest;

            /**
             * Verifies a GetVersionRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetVersionRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetVersionRequest
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.GetVersionRequest;

            /**
             * Creates a plain object from a GetVersionRequest message. Also converts values to other types if specified.
             * @param message GetVersionRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.GetVersionRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetVersionRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a ManagerService */
        class ManagerService extends $protobuf.rpc.Service {

            /**
             * Constructs a new ManagerService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Creates new ManagerService service using the specified rpc implementation.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             * @returns RPC service. Useful where requests and/or responses are streamed.
             */
            public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): ManagerService;

            /**
             * Calls GetAllVersions.
             * @param request Empty message or plain object
             * @param callback Node-style callback called with the error, if any, and ModelVersion
             */
            public getAllVersions(request: google.protobuf.IEmpty, callback: hydrosphere.manager.ManagerService.GetAllVersionsCallback): void;

            /**
             * Calls GetAllVersions.
             * @param request Empty message or plain object
             * @returns Promise
             */
            public getAllVersions(request: google.protobuf.IEmpty): Promise<hydrosphere.manager.ModelVersion>;

            /**
             * Calls GetVersion.
             * @param request GetVersionRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and ModelVersion
             */
            public getVersion(request: hydrosphere.manager.IGetVersionRequest, callback: hydrosphere.manager.ManagerService.GetVersionCallback): void;

            /**
             * Calls GetVersion.
             * @param request GetVersionRequest message or plain object
             * @returns Promise
             */
            public getVersion(request: hydrosphere.manager.IGetVersionRequest): Promise<hydrosphere.manager.ModelVersion>;
        }

        namespace ManagerService {

            /**
             * Callback as used by {@link hydrosphere.manager.ManagerService#getAllVersions}.
             * @param error Error, if any
             * @param [response] ModelVersion
             */
            type GetAllVersionsCallback = (error: (Error|null), response?: hydrosphere.manager.ModelVersion) => void;

            /**
             * Callback as used by {@link hydrosphere.manager.ManagerService#getVersion}.
             * @param error Error, if any
             * @param [response] ModelVersion
             */
            type GetVersionCallback = (error: (Error|null), response?: hydrosphere.manager.ModelVersion) => void;
        }

        /** Properties of a Model. */
        interface IModel {

            /** Model id */
            id?: (number|Long|null);

            /** Model name */
            name?: (string|null);
        }

        /** Represents a Model. */
        class Model implements IModel {

            /**
             * Constructs a new Model.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IModel);

            /** Model id. */
            public id: (number|Long);

            /** Model name. */
            public name: string;

            /**
             * Creates a new Model instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Model instance
             */
            public static create(properties?: hydrosphere.manager.IModel): hydrosphere.manager.Model;

            /**
             * Encodes the specified Model message. Does not implicitly {@link hydrosphere.manager.Model.verify|verify} messages.
             * @param message Model message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IModel, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Model message, length delimited. Does not implicitly {@link hydrosphere.manager.Model.verify|verify} messages.
             * @param message Model message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IModel, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Model message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Model
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.Model;

            /**
             * Decodes a Model message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Model
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.Model;

            /**
             * Verifies a Model message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Model message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Model
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.Model;

            /**
             * Creates a plain object from a Model message. Also converts values to other types if specified.
             * @param message Model
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.Model, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Model to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DockerImage. */
        interface IDockerImage {

            /** DockerImage name */
            name?: (string|null);

            /** DockerImage tag */
            tag?: (string|null);
        }

        /** Represents a DockerImage. */
        class DockerImage implements IDockerImage {

            /**
             * Constructs a new DockerImage.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IDockerImage);

            /** DockerImage name. */
            public name: string;

            /** DockerImage tag. */
            public tag: string;

            /**
             * Creates a new DockerImage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DockerImage instance
             */
            public static create(properties?: hydrosphere.manager.IDockerImage): hydrosphere.manager.DockerImage;

            /**
             * Encodes the specified DockerImage message. Does not implicitly {@link hydrosphere.manager.DockerImage.verify|verify} messages.
             * @param message DockerImage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IDockerImage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DockerImage message, length delimited. Does not implicitly {@link hydrosphere.manager.DockerImage.verify|verify} messages.
             * @param message DockerImage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IDockerImage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DockerImage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DockerImage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.DockerImage;

            /**
             * Decodes a DockerImage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DockerImage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.DockerImage;

            /**
             * Verifies a DockerImage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DockerImage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DockerImage
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.DockerImage;

            /**
             * Creates a plain object from a DockerImage message. Also converts values to other types if specified.
             * @param message DockerImage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.DockerImage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DockerImage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ModelVersion. */
        interface IModelVersion {

            /** ModelVersion id */
            id?: (number|Long|null);

            /** ModelVersion version */
            version?: (number|Long|null);

            /** ModelVersion modelType */
            modelType?: (string|null);

            /** ModelVersion status */
            status?: (string|null);

            /** ModelVersion selector */
            selector?: (hydrosphere.manager.IHostSelector|null);

            /** ModelVersion model */
            model?: (hydrosphere.manager.IModel|null);

            /** ModelVersion contract */
            contract?: (hydrosphere.contract.IModelContract|null);

            /** ModelVersion dataTypes */
            dataTypes?: ({ [k: string]: hydrosphere.manager.DataProfileType }|null);

            /** ModelVersion image */
            image?: (hydrosphere.manager.IDockerImage|null);

            /** ModelVersion imageSha */
            imageSha?: (string|null);

            /** ModelVersion runtime */
            runtime?: (hydrosphere.manager.IDockerImage|null);
        }

        /** Represents a ModelVersion. */
        class ModelVersion implements IModelVersion {

            /**
             * Constructs a new ModelVersion.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IModelVersion);

            /** ModelVersion id. */
            public id: (number|Long);

            /** ModelVersion version. */
            public version: (number|Long);

            /** ModelVersion modelType. */
            public modelType: string;

            /** ModelVersion status. */
            public status: string;

            /** ModelVersion selector. */
            public selector?: (hydrosphere.manager.IHostSelector|null);

            /** ModelVersion model. */
            public model?: (hydrosphere.manager.IModel|null);

            /** ModelVersion contract. */
            public contract?: (hydrosphere.contract.IModelContract|null);

            /** ModelVersion dataTypes. */
            public dataTypes: { [k: string]: hydrosphere.manager.DataProfileType };

            /** ModelVersion image. */
            public image?: (hydrosphere.manager.IDockerImage|null);

            /** ModelVersion imageSha. */
            public imageSha: string;

            /** ModelVersion runtime. */
            public runtime?: (hydrosphere.manager.IDockerImage|null);

            /**
             * Creates a new ModelVersion instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ModelVersion instance
             */
            public static create(properties?: hydrosphere.manager.IModelVersion): hydrosphere.manager.ModelVersion;

            /**
             * Encodes the specified ModelVersion message. Does not implicitly {@link hydrosphere.manager.ModelVersion.verify|verify} messages.
             * @param message ModelVersion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IModelVersion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ModelVersion message, length delimited. Does not implicitly {@link hydrosphere.manager.ModelVersion.verify|verify} messages.
             * @param message ModelVersion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IModelVersion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ModelVersion message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ModelVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.ModelVersion;

            /**
             * Decodes a ModelVersion message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ModelVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.ModelVersion;

            /**
             * Verifies a ModelVersion message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ModelVersion message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ModelVersion
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.ModelVersion;

            /**
             * Creates a plain object from a ModelVersion message. Also converts values to other types if specified.
             * @param message ModelVersion
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.ModelVersion, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ModelVersion to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a HostSelector. */
        interface IHostSelector {

            /** HostSelector id */
            id?: (number|Long|null);

            /** HostSelector name */
            name?: (string|null);
        }

        /** Represents a HostSelector. */
        class HostSelector implements IHostSelector {

            /**
             * Constructs a new HostSelector.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.manager.IHostSelector);

            /** HostSelector id. */
            public id: (number|Long);

            /** HostSelector name. */
            public name: string;

            /**
             * Creates a new HostSelector instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HostSelector instance
             */
            public static create(properties?: hydrosphere.manager.IHostSelector): hydrosphere.manager.HostSelector;

            /**
             * Encodes the specified HostSelector message. Does not implicitly {@link hydrosphere.manager.HostSelector.verify|verify} messages.
             * @param message HostSelector message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.manager.IHostSelector, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HostSelector message, length delimited. Does not implicitly {@link hydrosphere.manager.HostSelector.verify|verify} messages.
             * @param message HostSelector message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.manager.IHostSelector, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HostSelector message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HostSelector
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.manager.HostSelector;

            /**
             * Decodes a HostSelector message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HostSelector
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.manager.HostSelector;

            /**
             * Verifies a HostSelector message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HostSelector message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HostSelector
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.manager.HostSelector;

            /**
             * Creates a plain object from a HostSelector message. Also converts values to other types if specified.
             * @param message HostSelector
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.manager.HostSelector, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HostSelector to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace tensorflow. */
    namespace tensorflow {

        /** Namespace serving. */
        namespace serving {

            /** Properties of a PredictRequest. */
            interface IPredictRequest {

                /** PredictRequest modelSpec */
                modelSpec?: (hydrosphere.tensorflow.serving.IModelSpec|null);

                /** PredictRequest inputs */
                inputs?: ({ [k: string]: hydrosphere.tensorflow.ITensorProto }|null);
            }

            /** Represents a PredictRequest. */
            class PredictRequest implements IPredictRequest {

                /**
                 * Constructs a new PredictRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hydrosphere.tensorflow.serving.IPredictRequest);

                /** PredictRequest modelSpec. */
                public modelSpec?: (hydrosphere.tensorflow.serving.IModelSpec|null);

                /** PredictRequest inputs. */
                public inputs: { [k: string]: hydrosphere.tensorflow.ITensorProto };

                /**
                 * Creates a new PredictRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PredictRequest instance
                 */
                public static create(properties?: hydrosphere.tensorflow.serving.IPredictRequest): hydrosphere.tensorflow.serving.PredictRequest;

                /**
                 * Encodes the specified PredictRequest message. Does not implicitly {@link hydrosphere.tensorflow.serving.PredictRequest.verify|verify} messages.
                 * @param message PredictRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: hydrosphere.tensorflow.serving.IPredictRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PredictRequest message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.serving.PredictRequest.verify|verify} messages.
                 * @param message PredictRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: hydrosphere.tensorflow.serving.IPredictRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PredictRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PredictRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.tensorflow.serving.PredictRequest;

                /**
                 * Decodes a PredictRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PredictRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.tensorflow.serving.PredictRequest;

                /**
                 * Verifies a PredictRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PredictRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PredictRequest
                 */
                public static fromObject(object: { [k: string]: any }): hydrosphere.tensorflow.serving.PredictRequest;

                /**
                 * Creates a plain object from a PredictRequest message. Also converts values to other types if specified.
                 * @param message PredictRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: hydrosphere.tensorflow.serving.PredictRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PredictRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PredictResponse. */
            interface IPredictResponse {

                /** PredictResponse outputs */
                outputs?: ({ [k: string]: hydrosphere.tensorflow.ITensorProto }|null);

                /** PredictResponse internalInfo */
                internalInfo?: ({ [k: string]: hydrosphere.tensorflow.ITensorProto }|null);
            }

            /** Represents a PredictResponse. */
            class PredictResponse implements IPredictResponse {

                /**
                 * Constructs a new PredictResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hydrosphere.tensorflow.serving.IPredictResponse);

                /** PredictResponse outputs. */
                public outputs: { [k: string]: hydrosphere.tensorflow.ITensorProto };

                /** PredictResponse internalInfo. */
                public internalInfo: { [k: string]: hydrosphere.tensorflow.ITensorProto };

                /**
                 * Creates a new PredictResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PredictResponse instance
                 */
                public static create(properties?: hydrosphere.tensorflow.serving.IPredictResponse): hydrosphere.tensorflow.serving.PredictResponse;

                /**
                 * Encodes the specified PredictResponse message. Does not implicitly {@link hydrosphere.tensorflow.serving.PredictResponse.verify|verify} messages.
                 * @param message PredictResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: hydrosphere.tensorflow.serving.IPredictResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PredictResponse message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.serving.PredictResponse.verify|verify} messages.
                 * @param message PredictResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: hydrosphere.tensorflow.serving.IPredictResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PredictResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PredictResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.tensorflow.serving.PredictResponse;

                /**
                 * Decodes a PredictResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PredictResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.tensorflow.serving.PredictResponse;

                /**
                 * Verifies a PredictResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PredictResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PredictResponse
                 */
                public static fromObject(object: { [k: string]: any }): hydrosphere.tensorflow.serving.PredictResponse;

                /**
                 * Creates a plain object from a PredictResponse message. Also converts values to other types if specified.
                 * @param message PredictResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: hydrosphere.tensorflow.serving.PredictResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PredictResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ModelSpec. */
            interface IModelSpec {

                /** ModelSpec name */
                name?: (string|null);

                /** ModelSpec version */
                version?: (google.protobuf.IInt64Value|null);

                /** ModelSpec signatureName */
                signatureName?: (string|null);
            }

            /** Represents a ModelSpec. */
            class ModelSpec implements IModelSpec {

                /**
                 * Constructs a new ModelSpec.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hydrosphere.tensorflow.serving.IModelSpec);

                /** ModelSpec name. */
                public name: string;

                /** ModelSpec version. */
                public version?: (google.protobuf.IInt64Value|null);

                /** ModelSpec signatureName. */
                public signatureName: string;

                /**
                 * Creates a new ModelSpec instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ModelSpec instance
                 */
                public static create(properties?: hydrosphere.tensorflow.serving.IModelSpec): hydrosphere.tensorflow.serving.ModelSpec;

                /**
                 * Encodes the specified ModelSpec message. Does not implicitly {@link hydrosphere.tensorflow.serving.ModelSpec.verify|verify} messages.
                 * @param message ModelSpec message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: hydrosphere.tensorflow.serving.IModelSpec, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ModelSpec message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.serving.ModelSpec.verify|verify} messages.
                 * @param message ModelSpec message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: hydrosphere.tensorflow.serving.IModelSpec, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ModelSpec message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ModelSpec
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.tensorflow.serving.ModelSpec;

                /**
                 * Decodes a ModelSpec message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ModelSpec
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.tensorflow.serving.ModelSpec;

                /**
                 * Verifies a ModelSpec message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ModelSpec message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ModelSpec
                 */
                public static fromObject(object: { [k: string]: any }): hydrosphere.tensorflow.serving.ModelSpec;

                /**
                 * Creates a plain object from a ModelSpec message. Also converts values to other types if specified.
                 * @param message ModelSpec
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: hydrosphere.tensorflow.serving.ModelSpec, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ModelSpec to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a TensorProto. */
        interface ITensorProto {

            /** TensorProto dtype */
            dtype?: (hydrosphere.tensorflow.DataType|null);

            /** TensorProto tensorShape */
            tensorShape?: (hydrosphere.tensorflow.ITensorShapeProto|null);

            /** TensorProto versionNumber */
            versionNumber?: (number|null);

            /** TensorProto tensorContent */
            tensorContent?: (Uint8Array|null);

            /** TensorProto halfVal */
            halfVal?: (number[]|null);

            /** TensorProto floatVal */
            floatVal?: (number[]|null);

            /** TensorProto doubleVal */
            doubleVal?: (number[]|null);

            /** TensorProto intVal */
            intVal?: (number[]|null);

            /** TensorProto stringVal */
            stringVal?: (Uint8Array[]|null);

            /** TensorProto scomplexVal */
            scomplexVal?: (number[]|null);

            /** TensorProto int64Val */
            int64Val?: ((number|Long)[]|null);

            /** TensorProto boolVal */
            boolVal?: (boolean[]|null);

            /** TensorProto dcomplexVal */
            dcomplexVal?: (number[]|null);

            /** TensorProto variantVal */
            variantVal?: (hydrosphere.tensorflow.IVariantTensorDataProto[]|null);

            /** TensorProto uint32Val */
            uint32Val?: (number[]|null);

            /** TensorProto uint64Val */
            uint64Val?: ((number|Long)[]|null);

            /** TensorProto mapVal */
            mapVal?: (hydrosphere.tensorflow.IMapTensorData[]|null);
        }

        /** Represents a TensorProto. */
        class TensorProto implements ITensorProto {

            /**
             * Constructs a new TensorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.tensorflow.ITensorProto);

            /** TensorProto dtype. */
            public dtype: hydrosphere.tensorflow.DataType;

            /** TensorProto tensorShape. */
            public tensorShape?: (hydrosphere.tensorflow.ITensorShapeProto|null);

            /** TensorProto versionNumber. */
            public versionNumber: number;

            /** TensorProto tensorContent. */
            public tensorContent: Uint8Array;

            /** TensorProto halfVal. */
            public halfVal: number[];

            /** TensorProto floatVal. */
            public floatVal: number[];

            /** TensorProto doubleVal. */
            public doubleVal: number[];

            /** TensorProto intVal. */
            public intVal: number[];

            /** TensorProto stringVal. */
            public stringVal: Uint8Array[];

            /** TensorProto scomplexVal. */
            public scomplexVal: number[];

            /** TensorProto int64Val. */
            public int64Val: (number|Long)[];

            /** TensorProto boolVal. */
            public boolVal: boolean[];

            /** TensorProto dcomplexVal. */
            public dcomplexVal: number[];

            /** TensorProto variantVal. */
            public variantVal: hydrosphere.tensorflow.IVariantTensorDataProto[];

            /** TensorProto uint32Val. */
            public uint32Val: number[];

            /** TensorProto uint64Val. */
            public uint64Val: (number|Long)[];

            /** TensorProto mapVal. */
            public mapVal: hydrosphere.tensorflow.IMapTensorData[];

            /**
             * Creates a new TensorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TensorProto instance
             */
            public static create(properties?: hydrosphere.tensorflow.ITensorProto): hydrosphere.tensorflow.TensorProto;

            /**
             * Encodes the specified TensorProto message. Does not implicitly {@link hydrosphere.tensorflow.TensorProto.verify|verify} messages.
             * @param message TensorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.tensorflow.ITensorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TensorProto message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.TensorProto.verify|verify} messages.
             * @param message TensorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.tensorflow.ITensorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TensorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TensorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.tensorflow.TensorProto;

            /**
             * Decodes a TensorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TensorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.tensorflow.TensorProto;

            /**
             * Verifies a TensorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TensorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TensorProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.tensorflow.TensorProto;

            /**
             * Creates a plain object from a TensorProto message. Also converts values to other types if specified.
             * @param message TensorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.tensorflow.TensorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TensorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a VariantTensorDataProto. */
        interface IVariantTensorDataProto {

            /** VariantTensorDataProto typeName */
            typeName?: (string|null);

            /** VariantTensorDataProto metadata */
            metadata?: (Uint8Array|null);

            /** VariantTensorDataProto tensors */
            tensors?: (hydrosphere.tensorflow.ITensorProto[]|null);
        }

        /** Represents a VariantTensorDataProto. */
        class VariantTensorDataProto implements IVariantTensorDataProto {

            /**
             * Constructs a new VariantTensorDataProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.tensorflow.IVariantTensorDataProto);

            /** VariantTensorDataProto typeName. */
            public typeName: string;

            /** VariantTensorDataProto metadata. */
            public metadata: Uint8Array;

            /** VariantTensorDataProto tensors. */
            public tensors: hydrosphere.tensorflow.ITensorProto[];

            /**
             * Creates a new VariantTensorDataProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns VariantTensorDataProto instance
             */
            public static create(properties?: hydrosphere.tensorflow.IVariantTensorDataProto): hydrosphere.tensorflow.VariantTensorDataProto;

            /**
             * Encodes the specified VariantTensorDataProto message. Does not implicitly {@link hydrosphere.tensorflow.VariantTensorDataProto.verify|verify} messages.
             * @param message VariantTensorDataProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.tensorflow.IVariantTensorDataProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VariantTensorDataProto message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.VariantTensorDataProto.verify|verify} messages.
             * @param message VariantTensorDataProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.tensorflow.IVariantTensorDataProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VariantTensorDataProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VariantTensorDataProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.tensorflow.VariantTensorDataProto;

            /**
             * Decodes a VariantTensorDataProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VariantTensorDataProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.tensorflow.VariantTensorDataProto;

            /**
             * Verifies a VariantTensorDataProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VariantTensorDataProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VariantTensorDataProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.tensorflow.VariantTensorDataProto;

            /**
             * Creates a plain object from a VariantTensorDataProto message. Also converts values to other types if specified.
             * @param message VariantTensorDataProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.tensorflow.VariantTensorDataProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VariantTensorDataProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MapTensorData. */
        interface IMapTensorData {

            /** MapTensorData subtensors */
            subtensors?: ({ [k: string]: hydrosphere.tensorflow.ITensorProto }|null);
        }

        /** Represents a MapTensorData. */
        class MapTensorData implements IMapTensorData {

            /**
             * Constructs a new MapTensorData.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.tensorflow.IMapTensorData);

            /** MapTensorData subtensors. */
            public subtensors: { [k: string]: hydrosphere.tensorflow.ITensorProto };

            /**
             * Creates a new MapTensorData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MapTensorData instance
             */
            public static create(properties?: hydrosphere.tensorflow.IMapTensorData): hydrosphere.tensorflow.MapTensorData;

            /**
             * Encodes the specified MapTensorData message. Does not implicitly {@link hydrosphere.tensorflow.MapTensorData.verify|verify} messages.
             * @param message MapTensorData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.tensorflow.IMapTensorData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MapTensorData message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.MapTensorData.verify|verify} messages.
             * @param message MapTensorData message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.tensorflow.IMapTensorData, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MapTensorData message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MapTensorData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.tensorflow.MapTensorData;

            /**
             * Decodes a MapTensorData message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MapTensorData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.tensorflow.MapTensorData;

            /**
             * Verifies a MapTensorData message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MapTensorData message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MapTensorData
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.tensorflow.MapTensorData;

            /**
             * Creates a plain object from a MapTensorData message. Also converts values to other types if specified.
             * @param message MapTensorData
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.tensorflow.MapTensorData, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MapTensorData to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** DataType enum. */
        enum DataType {
            DT_INVALID = 0,
            DT_FLOAT = 1,
            DT_DOUBLE = 2,
            DT_INT32 = 3,
            DT_UINT8 = 4,
            DT_INT16 = 5,
            DT_INT8 = 6,
            DT_STRING = 7,
            DT_COMPLEX64 = 8,
            DT_INT64 = 9,
            DT_BOOL = 10,
            DT_QINT8 = 11,
            DT_QUINT8 = 12,
            DT_QINT32 = 13,
            DT_BFLOAT16 = 14,
            DT_QINT16 = 15,
            DT_QUINT16 = 16,
            DT_UINT16 = 17,
            DT_COMPLEX128 = 18,
            DT_HALF = 19,
            DT_RESOURCE = 20,
            DT_VARIANT = 21,
            DT_UINT32 = 22,
            DT_UINT64 = 23,
            DT_MAP = 27
        }

        /** Properties of a TensorShapeProto. */
        interface ITensorShapeProto {

            /** TensorShapeProto dim */
            dim?: (hydrosphere.tensorflow.TensorShapeProto.IDim[]|null);

            /** TensorShapeProto unknownRank */
            unknownRank?: (boolean|null);
        }

        /** Represents a TensorShapeProto. */
        class TensorShapeProto implements ITensorShapeProto {

            /**
             * Constructs a new TensorShapeProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.tensorflow.ITensorShapeProto);

            /** TensorShapeProto dim. */
            public dim: hydrosphere.tensorflow.TensorShapeProto.IDim[];

            /** TensorShapeProto unknownRank. */
            public unknownRank: boolean;

            /**
             * Creates a new TensorShapeProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TensorShapeProto instance
             */
            public static create(properties?: hydrosphere.tensorflow.ITensorShapeProto): hydrosphere.tensorflow.TensorShapeProto;

            /**
             * Encodes the specified TensorShapeProto message. Does not implicitly {@link hydrosphere.tensorflow.TensorShapeProto.verify|verify} messages.
             * @param message TensorShapeProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.tensorflow.ITensorShapeProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TensorShapeProto message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.TensorShapeProto.verify|verify} messages.
             * @param message TensorShapeProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.tensorflow.ITensorShapeProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TensorShapeProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TensorShapeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.tensorflow.TensorShapeProto;

            /**
             * Decodes a TensorShapeProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TensorShapeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.tensorflow.TensorShapeProto;

            /**
             * Verifies a TensorShapeProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TensorShapeProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TensorShapeProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.tensorflow.TensorShapeProto;

            /**
             * Creates a plain object from a TensorShapeProto message. Also converts values to other types if specified.
             * @param message TensorShapeProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.tensorflow.TensorShapeProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TensorShapeProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace TensorShapeProto {

            /** Properties of a Dim. */
            interface IDim {

                /** Dim size */
                size?: (number|Long|null);

                /** Dim name */
                name?: (string|null);
            }

            /** Represents a Dim. */
            class Dim implements IDim {

                /**
                 * Constructs a new Dim.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hydrosphere.tensorflow.TensorShapeProto.IDim);

                /** Dim size. */
                public size: (number|Long);

                /** Dim name. */
                public name: string;

                /**
                 * Creates a new Dim instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Dim instance
                 */
                public static create(properties?: hydrosphere.tensorflow.TensorShapeProto.IDim): hydrosphere.tensorflow.TensorShapeProto.Dim;

                /**
                 * Encodes the specified Dim message. Does not implicitly {@link hydrosphere.tensorflow.TensorShapeProto.Dim.verify|verify} messages.
                 * @param message Dim message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: hydrosphere.tensorflow.TensorShapeProto.IDim, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Dim message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.TensorShapeProto.Dim.verify|verify} messages.
                 * @param message Dim message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: hydrosphere.tensorflow.TensorShapeProto.IDim, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Dim message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Dim
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.tensorflow.TensorShapeProto.Dim;

                /**
                 * Decodes a Dim message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Dim
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.tensorflow.TensorShapeProto.Dim;

                /**
                 * Verifies a Dim message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Dim message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Dim
                 */
                public static fromObject(object: { [k: string]: any }): hydrosphere.tensorflow.TensorShapeProto.Dim;

                /**
                 * Creates a plain object from a Dim message. Also converts values to other types if specified.
                 * @param message Dim
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: hydrosphere.tensorflow.TensorShapeProto.Dim, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Dim to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace contract. */
    namespace contract {

        /** Properties of a ModelField. */
        interface IModelField {

            /** ModelField name */
            name?: (string|null);

            /** ModelField shape */
            shape?: (hydrosphere.tensorflow.ITensorShapeProto|null);

            /** ModelField subfields */
            subfields?: (hydrosphere.contract.ModelField.ISubfield|null);

            /** ModelField dtype */
            dtype?: (hydrosphere.tensorflow.DataType|null);
        }

        /** Represents a ModelField. */
        class ModelField implements IModelField {

            /**
             * Constructs a new ModelField.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.contract.IModelField);

            /** ModelField name. */
            public name: string;

            /** ModelField shape. */
            public shape?: (hydrosphere.tensorflow.ITensorShapeProto|null);

            /** ModelField subfields. */
            public subfields?: (hydrosphere.contract.ModelField.ISubfield|null);

            /** ModelField dtype. */
            public dtype: hydrosphere.tensorflow.DataType;

            /** ModelField typeOrSubfields. */
            public typeOrSubfields?: ("subfields"|"dtype");

            /**
             * Creates a new ModelField instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ModelField instance
             */
            public static create(properties?: hydrosphere.contract.IModelField): hydrosphere.contract.ModelField;

            /**
             * Encodes the specified ModelField message. Does not implicitly {@link hydrosphere.contract.ModelField.verify|verify} messages.
             * @param message ModelField message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.contract.IModelField, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ModelField message, length delimited. Does not implicitly {@link hydrosphere.contract.ModelField.verify|verify} messages.
             * @param message ModelField message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.contract.IModelField, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ModelField message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ModelField
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.contract.ModelField;

            /**
             * Decodes a ModelField message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ModelField
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.contract.ModelField;

            /**
             * Verifies a ModelField message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ModelField message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ModelField
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.contract.ModelField;

            /**
             * Creates a plain object from a ModelField message. Also converts values to other types if specified.
             * @param message ModelField
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.contract.ModelField, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ModelField to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace ModelField {

            /** Properties of a Subfield. */
            interface ISubfield {

                /** Subfield data */
                data?: (hydrosphere.contract.IModelField[]|null);
            }

            /** Represents a Subfield. */
            class Subfield implements ISubfield {

                /**
                 * Constructs a new Subfield.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hydrosphere.contract.ModelField.ISubfield);

                /** Subfield data. */
                public data: hydrosphere.contract.IModelField[];

                /**
                 * Creates a new Subfield instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Subfield instance
                 */
                public static create(properties?: hydrosphere.contract.ModelField.ISubfield): hydrosphere.contract.ModelField.Subfield;

                /**
                 * Encodes the specified Subfield message. Does not implicitly {@link hydrosphere.contract.ModelField.Subfield.verify|verify} messages.
                 * @param message Subfield message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: hydrosphere.contract.ModelField.ISubfield, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Subfield message, length delimited. Does not implicitly {@link hydrosphere.contract.ModelField.Subfield.verify|verify} messages.
                 * @param message Subfield message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: hydrosphere.contract.ModelField.ISubfield, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Subfield message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Subfield
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.contract.ModelField.Subfield;

                /**
                 * Decodes a Subfield message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Subfield
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.contract.ModelField.Subfield;

                /**
                 * Verifies a Subfield message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Subfield message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Subfield
                 */
                public static fromObject(object: { [k: string]: any }): hydrosphere.contract.ModelField.Subfield;

                /**
                 * Creates a plain object from a Subfield message. Also converts values to other types if specified.
                 * @param message Subfield
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: hydrosphere.contract.ModelField.Subfield, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Subfield to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a ModelContract. */
        interface IModelContract {

            /** ModelContract modelName */
            modelName?: (string|null);

            /** ModelContract signatures */
            signatures?: (hydrosphere.contract.IModelSignature[]|null);
        }

        /** Represents a ModelContract. */
        class ModelContract implements IModelContract {

            /**
             * Constructs a new ModelContract.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.contract.IModelContract);

            /** ModelContract modelName. */
            public modelName: string;

            /** ModelContract signatures. */
            public signatures: hydrosphere.contract.IModelSignature[];

            /**
             * Creates a new ModelContract instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ModelContract instance
             */
            public static create(properties?: hydrosphere.contract.IModelContract): hydrosphere.contract.ModelContract;

            /**
             * Encodes the specified ModelContract message. Does not implicitly {@link hydrosphere.contract.ModelContract.verify|verify} messages.
             * @param message ModelContract message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.contract.IModelContract, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ModelContract message, length delimited. Does not implicitly {@link hydrosphere.contract.ModelContract.verify|verify} messages.
             * @param message ModelContract message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.contract.IModelContract, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ModelContract message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ModelContract
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.contract.ModelContract;

            /**
             * Decodes a ModelContract message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ModelContract
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.contract.ModelContract;

            /**
             * Verifies a ModelContract message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ModelContract message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ModelContract
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.contract.ModelContract;

            /**
             * Creates a plain object from a ModelContract message. Also converts values to other types if specified.
             * @param message ModelContract
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.contract.ModelContract, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ModelContract to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ModelSignature. */
        interface IModelSignature {

            /** ModelSignature signatureName */
            signatureName?: (string|null);

            /** ModelSignature inputs */
            inputs?: (hydrosphere.contract.IModelField[]|null);

            /** ModelSignature outputs */
            outputs?: (hydrosphere.contract.IModelField[]|null);
        }

        /** Represents a ModelSignature. */
        class ModelSignature implements IModelSignature {

            /**
             * Constructs a new ModelSignature.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.contract.IModelSignature);

            /** ModelSignature signatureName. */
            public signatureName: string;

            /** ModelSignature inputs. */
            public inputs: hydrosphere.contract.IModelField[];

            /** ModelSignature outputs. */
            public outputs: hydrosphere.contract.IModelField[];

            /**
             * Creates a new ModelSignature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ModelSignature instance
             */
            public static create(properties?: hydrosphere.contract.IModelSignature): hydrosphere.contract.ModelSignature;

            /**
             * Encodes the specified ModelSignature message. Does not implicitly {@link hydrosphere.contract.ModelSignature.verify|verify} messages.
             * @param message ModelSignature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.contract.IModelSignature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ModelSignature message, length delimited. Does not implicitly {@link hydrosphere.contract.ModelSignature.verify|verify} messages.
             * @param message ModelSignature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.contract.IModelSignature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ModelSignature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ModelSignature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.contract.ModelSignature;

            /**
             * Decodes a ModelSignature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ModelSignature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.contract.ModelSignature;

            /**
             * Verifies a ModelSignature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ModelSignature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ModelSignature
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.contract.ModelSignature;

            /**
             * Creates a plain object from a ModelSignature message. Also converts values to other types if specified.
             * @param message ModelSignature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.contract.ModelSignature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ModelSignature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace onnx. */
    namespace onnx {

        /** Version enum. */
        enum Version {
            _START_VERSION = 0,
            IR_VERSION_2017_10_10 = 1,
            IR_VERSION_2017_10_30 = 2,
            IR_VERSION = 3
        }

        /** Properties of an AttributeProto. */
        interface IAttributeProto {

            /** AttributeProto name */
            name?: (string|null);

            /** AttributeProto refAttrName */
            refAttrName?: (string|null);

            /** AttributeProto docString */
            docString?: (string|null);

            /** AttributeProto type */
            type?: (hydrosphere.onnx.AttributeProto.AttributeType|null);

            /** AttributeProto f */
            f?: (number|null);

            /** AttributeProto i */
            i?: (number|Long|null);

            /** AttributeProto s */
            s?: (Uint8Array|null);

            /** AttributeProto t */
            t?: (hydrosphere.onnx.ITensorProto|null);

            /** AttributeProto g */
            g?: (hydrosphere.onnx.IGraphProto|null);

            /** AttributeProto floats */
            floats?: (number[]|null);

            /** AttributeProto ints */
            ints?: ((number|Long)[]|null);

            /** AttributeProto strings */
            strings?: (Uint8Array[]|null);

            /** AttributeProto tensors */
            tensors?: (hydrosphere.onnx.ITensorProto[]|null);

            /** AttributeProto graphs */
            graphs?: (hydrosphere.onnx.IGraphProto[]|null);
        }

        /** Represents an AttributeProto. */
        class AttributeProto implements IAttributeProto {

            /**
             * Constructs a new AttributeProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.IAttributeProto);

            /** AttributeProto name. */
            public name: string;

            /** AttributeProto refAttrName. */
            public refAttrName: string;

            /** AttributeProto docString. */
            public docString: string;

            /** AttributeProto type. */
            public type: hydrosphere.onnx.AttributeProto.AttributeType;

            /** AttributeProto f. */
            public f: number;

            /** AttributeProto i. */
            public i: (number|Long);

            /** AttributeProto s. */
            public s: Uint8Array;

            /** AttributeProto t. */
            public t?: (hydrosphere.onnx.ITensorProto|null);

            /** AttributeProto g. */
            public g?: (hydrosphere.onnx.IGraphProto|null);

            /** AttributeProto floats. */
            public floats: number[];

            /** AttributeProto ints. */
            public ints: (number|Long)[];

            /** AttributeProto strings. */
            public strings: Uint8Array[];

            /** AttributeProto tensors. */
            public tensors: hydrosphere.onnx.ITensorProto[];

            /** AttributeProto graphs. */
            public graphs: hydrosphere.onnx.IGraphProto[];

            /**
             * Creates a new AttributeProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AttributeProto instance
             */
            public static create(properties?: hydrosphere.onnx.IAttributeProto): hydrosphere.onnx.AttributeProto;

            /**
             * Encodes the specified AttributeProto message. Does not implicitly {@link hydrosphere.onnx.AttributeProto.verify|verify} messages.
             * @param message AttributeProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.IAttributeProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AttributeProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.AttributeProto.verify|verify} messages.
             * @param message AttributeProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.IAttributeProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AttributeProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AttributeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.AttributeProto;

            /**
             * Decodes an AttributeProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AttributeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.AttributeProto;

            /**
             * Verifies an AttributeProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AttributeProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AttributeProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.AttributeProto;

            /**
             * Creates a plain object from an AttributeProto message. Also converts values to other types if specified.
             * @param message AttributeProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.AttributeProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AttributeProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace AttributeProto {

            /** AttributeType enum. */
            enum AttributeType {
                UNDEFINED = 0,
                FLOAT = 1,
                INT = 2,
                STRING = 3,
                TENSOR = 4,
                GRAPH = 5,
                FLOATS = 6,
                INTS = 7,
                STRINGS = 8,
                TENSORS = 9,
                GRAPHS = 10
            }
        }

        /** Properties of a ValueInfoProto. */
        interface IValueInfoProto {

            /** ValueInfoProto name */
            name?: (string|null);

            /** ValueInfoProto type */
            type?: (hydrosphere.onnx.ITypeProto|null);

            /** ValueInfoProto docString */
            docString?: (string|null);
        }

        /** Represents a ValueInfoProto. */
        class ValueInfoProto implements IValueInfoProto {

            /**
             * Constructs a new ValueInfoProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.IValueInfoProto);

            /** ValueInfoProto name. */
            public name: string;

            /** ValueInfoProto type. */
            public type?: (hydrosphere.onnx.ITypeProto|null);

            /** ValueInfoProto docString. */
            public docString: string;

            /**
             * Creates a new ValueInfoProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ValueInfoProto instance
             */
            public static create(properties?: hydrosphere.onnx.IValueInfoProto): hydrosphere.onnx.ValueInfoProto;

            /**
             * Encodes the specified ValueInfoProto message. Does not implicitly {@link hydrosphere.onnx.ValueInfoProto.verify|verify} messages.
             * @param message ValueInfoProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.IValueInfoProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ValueInfoProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.ValueInfoProto.verify|verify} messages.
             * @param message ValueInfoProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.IValueInfoProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ValueInfoProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ValueInfoProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.ValueInfoProto;

            /**
             * Decodes a ValueInfoProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ValueInfoProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.ValueInfoProto;

            /**
             * Verifies a ValueInfoProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ValueInfoProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ValueInfoProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.ValueInfoProto;

            /**
             * Creates a plain object from a ValueInfoProto message. Also converts values to other types if specified.
             * @param message ValueInfoProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.ValueInfoProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ValueInfoProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a NodeProto. */
        interface INodeProto {

            /** NodeProto input */
            input?: (string[]|null);

            /** NodeProto output */
            output?: (string[]|null);

            /** NodeProto name */
            name?: (string|null);

            /** NodeProto opType */
            opType?: (string|null);

            /** NodeProto domain */
            domain?: (string|null);

            /** NodeProto attribute */
            attribute?: (hydrosphere.onnx.IAttributeProto[]|null);

            /** NodeProto docString */
            docString?: (string|null);
        }

        /** Represents a NodeProto. */
        class NodeProto implements INodeProto {

            /**
             * Constructs a new NodeProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.INodeProto);

            /** NodeProto input. */
            public input: string[];

            /** NodeProto output. */
            public output: string[];

            /** NodeProto name. */
            public name: string;

            /** NodeProto opType. */
            public opType: string;

            /** NodeProto domain. */
            public domain: string;

            /** NodeProto attribute. */
            public attribute: hydrosphere.onnx.IAttributeProto[];

            /** NodeProto docString. */
            public docString: string;

            /**
             * Creates a new NodeProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NodeProto instance
             */
            public static create(properties?: hydrosphere.onnx.INodeProto): hydrosphere.onnx.NodeProto;

            /**
             * Encodes the specified NodeProto message. Does not implicitly {@link hydrosphere.onnx.NodeProto.verify|verify} messages.
             * @param message NodeProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.INodeProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NodeProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.NodeProto.verify|verify} messages.
             * @param message NodeProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.INodeProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NodeProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NodeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.NodeProto;

            /**
             * Decodes a NodeProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NodeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.NodeProto;

            /**
             * Verifies a NodeProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NodeProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NodeProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.NodeProto;

            /**
             * Creates a plain object from a NodeProto message. Also converts values to other types if specified.
             * @param message NodeProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.NodeProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NodeProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ModelProto. */
        interface IModelProto {

            /** ModelProto irVersion */
            irVersion?: (number|Long|null);

            /** ModelProto opsetImport */
            opsetImport?: (hydrosphere.onnx.IOperatorSetIdProto[]|null);

            /** ModelProto producerName */
            producerName?: (string|null);

            /** ModelProto producerVersion */
            producerVersion?: (string|null);

            /** ModelProto domain */
            domain?: (string|null);

            /** ModelProto modelVersion */
            modelVersion?: (number|Long|null);

            /** ModelProto docString */
            docString?: (string|null);

            /** ModelProto graph */
            graph?: (hydrosphere.onnx.IGraphProto|null);

            /** ModelProto metadataProps */
            metadataProps?: (hydrosphere.onnx.IStringStringEntryProto[]|null);
        }

        /** Represents a ModelProto. */
        class ModelProto implements IModelProto {

            /**
             * Constructs a new ModelProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.IModelProto);

            /** ModelProto irVersion. */
            public irVersion: (number|Long);

            /** ModelProto opsetImport. */
            public opsetImport: hydrosphere.onnx.IOperatorSetIdProto[];

            /** ModelProto producerName. */
            public producerName: string;

            /** ModelProto producerVersion. */
            public producerVersion: string;

            /** ModelProto domain. */
            public domain: string;

            /** ModelProto modelVersion. */
            public modelVersion: (number|Long);

            /** ModelProto docString. */
            public docString: string;

            /** ModelProto graph. */
            public graph?: (hydrosphere.onnx.IGraphProto|null);

            /** ModelProto metadataProps. */
            public metadataProps: hydrosphere.onnx.IStringStringEntryProto[];

            /**
             * Creates a new ModelProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ModelProto instance
             */
            public static create(properties?: hydrosphere.onnx.IModelProto): hydrosphere.onnx.ModelProto;

            /**
             * Encodes the specified ModelProto message. Does not implicitly {@link hydrosphere.onnx.ModelProto.verify|verify} messages.
             * @param message ModelProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.IModelProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ModelProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.ModelProto.verify|verify} messages.
             * @param message ModelProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.IModelProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ModelProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ModelProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.ModelProto;

            /**
             * Decodes a ModelProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ModelProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.ModelProto;

            /**
             * Verifies a ModelProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ModelProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ModelProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.ModelProto;

            /**
             * Creates a plain object from a ModelProto message. Also converts values to other types if specified.
             * @param message ModelProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.ModelProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ModelProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a StringStringEntryProto. */
        interface IStringStringEntryProto {

            /** StringStringEntryProto key */
            key?: (string|null);

            /** StringStringEntryProto value */
            value?: (string|null);
        }

        /** Represents a StringStringEntryProto. */
        class StringStringEntryProto implements IStringStringEntryProto {

            /**
             * Constructs a new StringStringEntryProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.IStringStringEntryProto);

            /** StringStringEntryProto key. */
            public key: string;

            /** StringStringEntryProto value. */
            public value: string;

            /**
             * Creates a new StringStringEntryProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StringStringEntryProto instance
             */
            public static create(properties?: hydrosphere.onnx.IStringStringEntryProto): hydrosphere.onnx.StringStringEntryProto;

            /**
             * Encodes the specified StringStringEntryProto message. Does not implicitly {@link hydrosphere.onnx.StringStringEntryProto.verify|verify} messages.
             * @param message StringStringEntryProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.IStringStringEntryProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StringStringEntryProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.StringStringEntryProto.verify|verify} messages.
             * @param message StringStringEntryProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.IStringStringEntryProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StringStringEntryProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StringStringEntryProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.StringStringEntryProto;

            /**
             * Decodes a StringStringEntryProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StringStringEntryProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.StringStringEntryProto;

            /**
             * Verifies a StringStringEntryProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StringStringEntryProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StringStringEntryProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.StringStringEntryProto;

            /**
             * Creates a plain object from a StringStringEntryProto message. Also converts values to other types if specified.
             * @param message StringStringEntryProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.StringStringEntryProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StringStringEntryProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GraphProto. */
        interface IGraphProto {

            /** GraphProto node */
            node?: (hydrosphere.onnx.INodeProto[]|null);

            /** GraphProto name */
            name?: (string|null);

            /** GraphProto initializer */
            initializer?: (hydrosphere.onnx.ITensorProto[]|null);

            /** GraphProto docString */
            docString?: (string|null);

            /** GraphProto input */
            input?: (hydrosphere.onnx.IValueInfoProto[]|null);

            /** GraphProto output */
            output?: (hydrosphere.onnx.IValueInfoProto[]|null);

            /** GraphProto valueInfo */
            valueInfo?: (hydrosphere.onnx.IValueInfoProto[]|null);
        }

        /** Represents a GraphProto. */
        class GraphProto implements IGraphProto {

            /**
             * Constructs a new GraphProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.IGraphProto);

            /** GraphProto node. */
            public node: hydrosphere.onnx.INodeProto[];

            /** GraphProto name. */
            public name: string;

            /** GraphProto initializer. */
            public initializer: hydrosphere.onnx.ITensorProto[];

            /** GraphProto docString. */
            public docString: string;

            /** GraphProto input. */
            public input: hydrosphere.onnx.IValueInfoProto[];

            /** GraphProto output. */
            public output: hydrosphere.onnx.IValueInfoProto[];

            /** GraphProto valueInfo. */
            public valueInfo: hydrosphere.onnx.IValueInfoProto[];

            /**
             * Creates a new GraphProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GraphProto instance
             */
            public static create(properties?: hydrosphere.onnx.IGraphProto): hydrosphere.onnx.GraphProto;

            /**
             * Encodes the specified GraphProto message. Does not implicitly {@link hydrosphere.onnx.GraphProto.verify|verify} messages.
             * @param message GraphProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.IGraphProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GraphProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.GraphProto.verify|verify} messages.
             * @param message GraphProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.IGraphProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GraphProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GraphProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.GraphProto;

            /**
             * Decodes a GraphProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GraphProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.GraphProto;

            /**
             * Verifies a GraphProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GraphProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GraphProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.GraphProto;

            /**
             * Creates a plain object from a GraphProto message. Also converts values to other types if specified.
             * @param message GraphProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.GraphProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GraphProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TensorProto. */
        interface ITensorProto {

            /** TensorProto dims */
            dims?: ((number|Long)[]|null);

            /** TensorProto dataType */
            dataType?: (hydrosphere.onnx.TensorProto.DataType|null);

            /** TensorProto segment */
            segment?: (hydrosphere.onnx.TensorProto.ISegment|null);

            /** TensorProto floatData */
            floatData?: (number[]|null);

            /** TensorProto int32Data */
            int32Data?: (number[]|null);

            /** TensorProto stringData */
            stringData?: (Uint8Array[]|null);

            /** TensorProto int64Data */
            int64Data?: ((number|Long)[]|null);

            /** TensorProto name */
            name?: (string|null);

            /** TensorProto docString */
            docString?: (string|null);

            /** TensorProto rawData */
            rawData?: (Uint8Array|null);

            /** TensorProto doubleData */
            doubleData?: (number[]|null);

            /** TensorProto uint64Data */
            uint64Data?: ((number|Long)[]|null);
        }

        /** Represents a TensorProto. */
        class TensorProto implements ITensorProto {

            /**
             * Constructs a new TensorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.ITensorProto);

            /** TensorProto dims. */
            public dims: (number|Long)[];

            /** TensorProto dataType. */
            public dataType: hydrosphere.onnx.TensorProto.DataType;

            /** TensorProto segment. */
            public segment?: (hydrosphere.onnx.TensorProto.ISegment|null);

            /** TensorProto floatData. */
            public floatData: number[];

            /** TensorProto int32Data. */
            public int32Data: number[];

            /** TensorProto stringData. */
            public stringData: Uint8Array[];

            /** TensorProto int64Data. */
            public int64Data: (number|Long)[];

            /** TensorProto name. */
            public name: string;

            /** TensorProto docString. */
            public docString: string;

            /** TensorProto rawData. */
            public rawData: Uint8Array;

            /** TensorProto doubleData. */
            public doubleData: number[];

            /** TensorProto uint64Data. */
            public uint64Data: (number|Long)[];

            /**
             * Creates a new TensorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TensorProto instance
             */
            public static create(properties?: hydrosphere.onnx.ITensorProto): hydrosphere.onnx.TensorProto;

            /**
             * Encodes the specified TensorProto message. Does not implicitly {@link hydrosphere.onnx.TensorProto.verify|verify} messages.
             * @param message TensorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.ITensorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TensorProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.TensorProto.verify|verify} messages.
             * @param message TensorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.ITensorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TensorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TensorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.TensorProto;

            /**
             * Decodes a TensorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TensorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.TensorProto;

            /**
             * Verifies a TensorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TensorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TensorProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.TensorProto;

            /**
             * Creates a plain object from a TensorProto message. Also converts values to other types if specified.
             * @param message TensorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.TensorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TensorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace TensorProto {

            /** DataType enum. */
            enum DataType {
                UNDEFINED = 0,
                FLOAT = 1,
                UINT8 = 2,
                INT8 = 3,
                UINT16 = 4,
                INT16 = 5,
                INT32 = 6,
                INT64 = 7,
                STRING = 8,
                BOOL = 9,
                FLOAT16 = 10,
                DOUBLE = 11,
                UINT32 = 12,
                UINT64 = 13,
                COMPLEX64 = 14,
                COMPLEX128 = 15
            }

            /** Properties of a Segment. */
            interface ISegment {

                /** Segment begin */
                begin?: (number|Long|null);

                /** Segment end */
                end?: (number|Long|null);
            }

            /** Represents a Segment. */
            class Segment implements ISegment {

                /**
                 * Constructs a new Segment.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hydrosphere.onnx.TensorProto.ISegment);

                /** Segment begin. */
                public begin: (number|Long);

                /** Segment end. */
                public end: (number|Long);

                /**
                 * Creates a new Segment instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Segment instance
                 */
                public static create(properties?: hydrosphere.onnx.TensorProto.ISegment): hydrosphere.onnx.TensorProto.Segment;

                /**
                 * Encodes the specified Segment message. Does not implicitly {@link hydrosphere.onnx.TensorProto.Segment.verify|verify} messages.
                 * @param message Segment message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: hydrosphere.onnx.TensorProto.ISegment, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Segment message, length delimited. Does not implicitly {@link hydrosphere.onnx.TensorProto.Segment.verify|verify} messages.
                 * @param message Segment message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: hydrosphere.onnx.TensorProto.ISegment, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Segment message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Segment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.TensorProto.Segment;

                /**
                 * Decodes a Segment message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Segment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.TensorProto.Segment;

                /**
                 * Verifies a Segment message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Segment message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Segment
                 */
                public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.TensorProto.Segment;

                /**
                 * Creates a plain object from a Segment message. Also converts values to other types if specified.
                 * @param message Segment
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: hydrosphere.onnx.TensorProto.Segment, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Segment to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a TensorShapeProto. */
        interface ITensorShapeProto {

            /** TensorShapeProto dim */
            dim?: (hydrosphere.onnx.TensorShapeProto.IDimension[]|null);
        }

        /** Represents a TensorShapeProto. */
        class TensorShapeProto implements ITensorShapeProto {

            /**
             * Constructs a new TensorShapeProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.ITensorShapeProto);

            /** TensorShapeProto dim. */
            public dim: hydrosphere.onnx.TensorShapeProto.IDimension[];

            /**
             * Creates a new TensorShapeProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TensorShapeProto instance
             */
            public static create(properties?: hydrosphere.onnx.ITensorShapeProto): hydrosphere.onnx.TensorShapeProto;

            /**
             * Encodes the specified TensorShapeProto message. Does not implicitly {@link hydrosphere.onnx.TensorShapeProto.verify|verify} messages.
             * @param message TensorShapeProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.ITensorShapeProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TensorShapeProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.TensorShapeProto.verify|verify} messages.
             * @param message TensorShapeProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.ITensorShapeProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TensorShapeProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TensorShapeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.TensorShapeProto;

            /**
             * Decodes a TensorShapeProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TensorShapeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.TensorShapeProto;

            /**
             * Verifies a TensorShapeProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TensorShapeProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TensorShapeProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.TensorShapeProto;

            /**
             * Creates a plain object from a TensorShapeProto message. Also converts values to other types if specified.
             * @param message TensorShapeProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.TensorShapeProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TensorShapeProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace TensorShapeProto {

            /** Properties of a Dimension. */
            interface IDimension {

                /** Dimension dimValue */
                dimValue?: (number|Long|null);

                /** Dimension dimParam */
                dimParam?: (string|null);

                /** Dimension denotation */
                denotation?: (string|null);
            }

            /** Represents a Dimension. */
            class Dimension implements IDimension {

                /**
                 * Constructs a new Dimension.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hydrosphere.onnx.TensorShapeProto.IDimension);

                /** Dimension dimValue. */
                public dimValue: (number|Long);

                /** Dimension dimParam. */
                public dimParam: string;

                /** Dimension denotation. */
                public denotation: string;

                /** Dimension value. */
                public value?: ("dimValue"|"dimParam");

                /**
                 * Creates a new Dimension instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Dimension instance
                 */
                public static create(properties?: hydrosphere.onnx.TensorShapeProto.IDimension): hydrosphere.onnx.TensorShapeProto.Dimension;

                /**
                 * Encodes the specified Dimension message. Does not implicitly {@link hydrosphere.onnx.TensorShapeProto.Dimension.verify|verify} messages.
                 * @param message Dimension message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: hydrosphere.onnx.TensorShapeProto.IDimension, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Dimension message, length delimited. Does not implicitly {@link hydrosphere.onnx.TensorShapeProto.Dimension.verify|verify} messages.
                 * @param message Dimension message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: hydrosphere.onnx.TensorShapeProto.IDimension, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Dimension message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Dimension
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.TensorShapeProto.Dimension;

                /**
                 * Decodes a Dimension message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Dimension
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.TensorShapeProto.Dimension;

                /**
                 * Verifies a Dimension message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Dimension message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Dimension
                 */
                public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.TensorShapeProto.Dimension;

                /**
                 * Creates a plain object from a Dimension message. Also converts values to other types if specified.
                 * @param message Dimension
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: hydrosphere.onnx.TensorShapeProto.Dimension, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Dimension to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a DenotationConstProto. */
        interface IDenotationConstProto {

            /** DenotationConstProto DATA_BATCH */
            DATA_BATCH?: (string|null);

            /** DenotationConstProto DATA_CHANNEL */
            DATA_CHANNEL?: (string|null);

            /** DenotationConstProto DATA_TIME */
            DATA_TIME?: (string|null);

            /** DenotationConstProto DATA_FEATURE */
            DATA_FEATURE?: (string|null);

            /** DenotationConstProto FILTER_IN_CHANNEL */
            FILTER_IN_CHANNEL?: (string|null);

            /** DenotationConstProto FILTER_OUT_CHANNEL */
            FILTER_OUT_CHANNEL?: (string|null);

            /** DenotationConstProto FILTER_SPATIAL */
            FILTER_SPATIAL?: (string|null);
        }

        /** Represents a DenotationConstProto. */
        class DenotationConstProto implements IDenotationConstProto {

            /**
             * Constructs a new DenotationConstProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.IDenotationConstProto);

            /** DenotationConstProto DATA_BATCH. */
            public DATA_BATCH: string;

            /** DenotationConstProto DATA_CHANNEL. */
            public DATA_CHANNEL: string;

            /** DenotationConstProto DATA_TIME. */
            public DATA_TIME: string;

            /** DenotationConstProto DATA_FEATURE. */
            public DATA_FEATURE: string;

            /** DenotationConstProto FILTER_IN_CHANNEL. */
            public FILTER_IN_CHANNEL: string;

            /** DenotationConstProto FILTER_OUT_CHANNEL. */
            public FILTER_OUT_CHANNEL: string;

            /** DenotationConstProto FILTER_SPATIAL. */
            public FILTER_SPATIAL: string;

            /**
             * Creates a new DenotationConstProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DenotationConstProto instance
             */
            public static create(properties?: hydrosphere.onnx.IDenotationConstProto): hydrosphere.onnx.DenotationConstProto;

            /**
             * Encodes the specified DenotationConstProto message. Does not implicitly {@link hydrosphere.onnx.DenotationConstProto.verify|verify} messages.
             * @param message DenotationConstProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.IDenotationConstProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DenotationConstProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.DenotationConstProto.verify|verify} messages.
             * @param message DenotationConstProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.IDenotationConstProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DenotationConstProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DenotationConstProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.DenotationConstProto;

            /**
             * Decodes a DenotationConstProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DenotationConstProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.DenotationConstProto;

            /**
             * Verifies a DenotationConstProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DenotationConstProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DenotationConstProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.DenotationConstProto;

            /**
             * Creates a plain object from a DenotationConstProto message. Also converts values to other types if specified.
             * @param message DenotationConstProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.DenotationConstProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DenotationConstProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TypeProto. */
        interface ITypeProto {

            /** TypeProto tensorType */
            tensorType?: (hydrosphere.onnx.TypeProto.ITensor|null);
        }

        /** Represents a TypeProto. */
        class TypeProto implements ITypeProto {

            /**
             * Constructs a new TypeProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.ITypeProto);

            /** TypeProto tensorType. */
            public tensorType?: (hydrosphere.onnx.TypeProto.ITensor|null);

            /** TypeProto value. */
            public value?: "tensorType";

            /**
             * Creates a new TypeProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TypeProto instance
             */
            public static create(properties?: hydrosphere.onnx.ITypeProto): hydrosphere.onnx.TypeProto;

            /**
             * Encodes the specified TypeProto message. Does not implicitly {@link hydrosphere.onnx.TypeProto.verify|verify} messages.
             * @param message TypeProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.ITypeProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TypeProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.TypeProto.verify|verify} messages.
             * @param message TypeProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.ITypeProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TypeProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TypeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.TypeProto;

            /**
             * Decodes a TypeProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TypeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.TypeProto;

            /**
             * Verifies a TypeProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TypeProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TypeProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.TypeProto;

            /**
             * Creates a plain object from a TypeProto message. Also converts values to other types if specified.
             * @param message TypeProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.TypeProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TypeProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace TypeProto {

            /** Properties of a Tensor. */
            interface ITensor {

                /** Tensor elemType */
                elemType?: (hydrosphere.onnx.TensorProto.DataType|null);

                /** Tensor shape */
                shape?: (hydrosphere.onnx.ITensorShapeProto|null);
            }

            /** Represents a Tensor. */
            class Tensor implements ITensor {

                /**
                 * Constructs a new Tensor.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hydrosphere.onnx.TypeProto.ITensor);

                /** Tensor elemType. */
                public elemType: hydrosphere.onnx.TensorProto.DataType;

                /** Tensor shape. */
                public shape?: (hydrosphere.onnx.ITensorShapeProto|null);

                /**
                 * Creates a new Tensor instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Tensor instance
                 */
                public static create(properties?: hydrosphere.onnx.TypeProto.ITensor): hydrosphere.onnx.TypeProto.Tensor;

                /**
                 * Encodes the specified Tensor message. Does not implicitly {@link hydrosphere.onnx.TypeProto.Tensor.verify|verify} messages.
                 * @param message Tensor message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: hydrosphere.onnx.TypeProto.ITensor, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Tensor message, length delimited. Does not implicitly {@link hydrosphere.onnx.TypeProto.Tensor.verify|verify} messages.
                 * @param message Tensor message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: hydrosphere.onnx.TypeProto.ITensor, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Tensor message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Tensor
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.TypeProto.Tensor;

                /**
                 * Decodes a Tensor message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Tensor
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.TypeProto.Tensor;

                /**
                 * Verifies a Tensor message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Tensor message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Tensor
                 */
                public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.TypeProto.Tensor;

                /**
                 * Creates a plain object from a Tensor message. Also converts values to other types if specified.
                 * @param message Tensor
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: hydrosphere.onnx.TypeProto.Tensor, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Tensor to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of an OperatorSetIdProto. */
        interface IOperatorSetIdProto {

            /** OperatorSetIdProto domain */
            domain?: (string|null);

            /** OperatorSetIdProto version */
            version?: (number|Long|null);
        }

        /** Represents an OperatorSetIdProto. */
        class OperatorSetIdProto implements IOperatorSetIdProto {

            /**
             * Constructs a new OperatorSetIdProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: hydrosphere.onnx.IOperatorSetIdProto);

            /** OperatorSetIdProto domain. */
            public domain: string;

            /** OperatorSetIdProto version. */
            public version: (number|Long);

            /**
             * Creates a new OperatorSetIdProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OperatorSetIdProto instance
             */
            public static create(properties?: hydrosphere.onnx.IOperatorSetIdProto): hydrosphere.onnx.OperatorSetIdProto;

            /**
             * Encodes the specified OperatorSetIdProto message. Does not implicitly {@link hydrosphere.onnx.OperatorSetIdProto.verify|verify} messages.
             * @param message OperatorSetIdProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: hydrosphere.onnx.IOperatorSetIdProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OperatorSetIdProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.OperatorSetIdProto.verify|verify} messages.
             * @param message OperatorSetIdProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: hydrosphere.onnx.IOperatorSetIdProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OperatorSetIdProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OperatorSetIdProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hydrosphere.onnx.OperatorSetIdProto;

            /**
             * Decodes an OperatorSetIdProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OperatorSetIdProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hydrosphere.onnx.OperatorSetIdProto;

            /**
             * Verifies an OperatorSetIdProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OperatorSetIdProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OperatorSetIdProto
             */
            public static fromObject(object: { [k: string]: any }): hydrosphere.onnx.OperatorSetIdProto;

            /**
             * Creates a plain object from an OperatorSetIdProto message. Also converts values to other types if specified.
             * @param message OperatorSetIdProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: hydrosphere.onnx.OperatorSetIdProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OperatorSetIdProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

/** Namespace tensorflow. */
export namespace tensorflow {

    /** Namespace serving. */
    namespace serving {

        /** Represents a PredictionService */
        class PredictionService extends $protobuf.rpc.Service {

            /**
             * Constructs a new PredictionService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Creates new PredictionService service using the specified rpc implementation.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             * @returns RPC service. Useful where requests and/or responses are streamed.
             */
            public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): PredictionService;

            /**
             * Calls Predict.
             * @param request PredictRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and PredictResponse
             */
            public predict(request: hydrosphere.tensorflow.serving.IPredictRequest, callback: tensorflow.serving.PredictionService.PredictCallback): void;

            /**
             * Calls Predict.
             * @param request PredictRequest message or plain object
             * @returns Promise
             */
            public predict(request: hydrosphere.tensorflow.serving.IPredictRequest): Promise<hydrosphere.tensorflow.serving.PredictResponse>;
        }

        namespace PredictionService {

            /**
             * Callback as used by {@link tensorflow.serving.PredictionService#predict}.
             * @param error Error, if any
             * @param [response] PredictResponse
             */
            type PredictCallback = (error: (Error|null), response?: hydrosphere.tensorflow.serving.PredictResponse) => void;
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Empty. */
        interface IEmpty {
        }

        /** Represents an Empty. */
        class Empty implements IEmpty {

            /**
             * Constructs a new Empty.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEmpty);

            /**
             * Creates a new Empty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Empty instance
             */
            public static create(properties?: google.protobuf.IEmpty): google.protobuf.Empty;

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Empty;

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Empty;

            /**
             * Verifies an Empty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Empty
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Empty;

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @param message Empty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Empty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DoubleValue. */
        interface IDoubleValue {

            /** DoubleValue value */
            value?: (number|null);
        }

        /** Represents a DoubleValue. */
        class DoubleValue implements IDoubleValue {

            /**
             * Constructs a new DoubleValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDoubleValue);

            /** DoubleValue value. */
            public value: number;

            /**
             * Creates a new DoubleValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DoubleValue instance
             */
            public static create(properties?: google.protobuf.IDoubleValue): google.protobuf.DoubleValue;

            /**
             * Encodes the specified DoubleValue message. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @param message DoubleValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDoubleValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DoubleValue message, length delimited. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @param message DoubleValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDoubleValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DoubleValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DoubleValue;

            /**
             * Decodes a DoubleValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DoubleValue;

            /**
             * Verifies a DoubleValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DoubleValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DoubleValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.DoubleValue;

            /**
             * Creates a plain object from a DoubleValue message. Also converts values to other types if specified.
             * @param message DoubleValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.DoubleValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DoubleValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FloatValue. */
        interface IFloatValue {

            /** FloatValue value */
            value?: (number|null);
        }

        /** Represents a FloatValue. */
        class FloatValue implements IFloatValue {

            /**
             * Constructs a new FloatValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFloatValue);

            /** FloatValue value. */
            public value: number;

            /**
             * Creates a new FloatValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FloatValue instance
             */
            public static create(properties?: google.protobuf.IFloatValue): google.protobuf.FloatValue;

            /**
             * Encodes the specified FloatValue message. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @param message FloatValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFloatValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FloatValue message, length delimited. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @param message FloatValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFloatValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FloatValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FloatValue;

            /**
             * Decodes a FloatValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FloatValue;

            /**
             * Verifies a FloatValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FloatValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FloatValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FloatValue;

            /**
             * Creates a plain object from a FloatValue message. Also converts values to other types if specified.
             * @param message FloatValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FloatValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FloatValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Int64Value. */
        interface IInt64Value {

            /** Int64Value value */
            value?: (number|Long|null);
        }

        /** Represents an Int64Value. */
        class Int64Value implements IInt64Value {

            /**
             * Constructs a new Int64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt64Value);

            /** Int64Value value. */
            public value: (number|Long);

            /**
             * Creates a new Int64Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Int64Value instance
             */
            public static create(properties?: google.protobuf.IInt64Value): google.protobuf.Int64Value;

            /**
             * Encodes the specified Int64Value message. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @param message Int64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Int64Value message, length delimited. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @param message Int64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Int64Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Int64Value;

            /**
             * Decodes an Int64Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Int64Value;

            /**
             * Verifies an Int64Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Int64Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Int64Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Int64Value;

            /**
             * Creates a plain object from an Int64Value message. Also converts values to other types if specified.
             * @param message Int64Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Int64Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Int64Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a UInt64Value. */
        interface IUInt64Value {

            /** UInt64Value value */
            value?: (number|Long|null);
        }

        /** Represents a UInt64Value. */
        class UInt64Value implements IUInt64Value {

            /**
             * Constructs a new UInt64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt64Value);

            /** UInt64Value value. */
            public value: (number|Long);

            /**
             * Creates a new UInt64Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UInt64Value instance
             */
            public static create(properties?: google.protobuf.IUInt64Value): google.protobuf.UInt64Value;

            /**
             * Encodes the specified UInt64Value message. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @param message UInt64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UInt64Value message, length delimited. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @param message UInt64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UInt64Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UInt64Value;

            /**
             * Decodes a UInt64Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UInt64Value;

            /**
             * Verifies a UInt64Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UInt64Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UInt64Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UInt64Value;

            /**
             * Creates a plain object from a UInt64Value message. Also converts values to other types if specified.
             * @param message UInt64Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UInt64Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UInt64Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Int32Value. */
        interface IInt32Value {

            /** Int32Value value */
            value?: (number|null);
        }

        /** Represents an Int32Value. */
        class Int32Value implements IInt32Value {

            /**
             * Constructs a new Int32Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt32Value);

            /** Int32Value value. */
            public value: number;

            /**
             * Creates a new Int32Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Int32Value instance
             */
            public static create(properties?: google.protobuf.IInt32Value): google.protobuf.Int32Value;

            /**
             * Encodes the specified Int32Value message. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @param message Int32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Int32Value message, length delimited. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @param message Int32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Int32Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Int32Value;

            /**
             * Decodes an Int32Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Int32Value;

            /**
             * Verifies an Int32Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Int32Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Int32Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Int32Value;

            /**
             * Creates a plain object from an Int32Value message. Also converts values to other types if specified.
             * @param message Int32Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Int32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Int32Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a UInt32Value. */
        interface IUInt32Value {

            /** UInt32Value value */
            value?: (number|null);
        }

        /** Represents a UInt32Value. */
        class UInt32Value implements IUInt32Value {

            /**
             * Constructs a new UInt32Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt32Value);

            /** UInt32Value value. */
            public value: number;

            /**
             * Creates a new UInt32Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UInt32Value instance
             */
            public static create(properties?: google.protobuf.IUInt32Value): google.protobuf.UInt32Value;

            /**
             * Encodes the specified UInt32Value message. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @param message UInt32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UInt32Value message, length delimited. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @param message UInt32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UInt32Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UInt32Value;

            /**
             * Decodes a UInt32Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UInt32Value;

            /**
             * Verifies a UInt32Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UInt32Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UInt32Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UInt32Value;

            /**
             * Creates a plain object from a UInt32Value message. Also converts values to other types if specified.
             * @param message UInt32Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UInt32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UInt32Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BoolValue. */
        interface IBoolValue {

            /** BoolValue value */
            value?: (boolean|null);
        }

        /** Represents a BoolValue. */
        class BoolValue implements IBoolValue {

            /**
             * Constructs a new BoolValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBoolValue);

            /** BoolValue value. */
            public value: boolean;

            /**
             * Creates a new BoolValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BoolValue instance
             */
            public static create(properties?: google.protobuf.IBoolValue): google.protobuf.BoolValue;

            /**
             * Encodes the specified BoolValue message. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @param message BoolValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IBoolValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BoolValue message, length delimited. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @param message BoolValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IBoolValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BoolValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.BoolValue;

            /**
             * Decodes a BoolValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.BoolValue;

            /**
             * Verifies a BoolValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BoolValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BoolValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.BoolValue;

            /**
             * Creates a plain object from a BoolValue message. Also converts values to other types if specified.
             * @param message BoolValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.BoolValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BoolValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a StringValue. */
        interface IStringValue {

            /** StringValue value */
            value?: (string|null);
        }

        /** Represents a StringValue. */
        class StringValue implements IStringValue {

            /**
             * Constructs a new StringValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IStringValue);

            /** StringValue value. */
            public value: string;

            /**
             * Creates a new StringValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StringValue instance
             */
            public static create(properties?: google.protobuf.IStringValue): google.protobuf.StringValue;

            /**
             * Encodes the specified StringValue message. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @param message StringValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IStringValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StringValue message, length delimited. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @param message StringValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IStringValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StringValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.StringValue;

            /**
             * Decodes a StringValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.StringValue;

            /**
             * Verifies a StringValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StringValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StringValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.StringValue;

            /**
             * Creates a plain object from a StringValue message. Also converts values to other types if specified.
             * @param message StringValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.StringValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StringValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BytesValue. */
        interface IBytesValue {

            /** BytesValue value */
            value?: (Uint8Array|null);
        }

        /** Represents a BytesValue. */
        class BytesValue implements IBytesValue {

            /**
             * Constructs a new BytesValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBytesValue);

            /** BytesValue value. */
            public value: Uint8Array;

            /**
             * Creates a new BytesValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BytesValue instance
             */
            public static create(properties?: google.protobuf.IBytesValue): google.protobuf.BytesValue;

            /**
             * Encodes the specified BytesValue message. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @param message BytesValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IBytesValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BytesValue message, length delimited. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @param message BytesValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IBytesValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BytesValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.BytesValue;

            /**
             * Decodes a BytesValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.BytesValue;

            /**
             * Verifies a BytesValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BytesValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BytesValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.BytesValue;

            /**
             * Creates a plain object from a BytesValue message. Also converts values to other types if specified.
             * @param message BytesValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.BytesValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BytesValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
