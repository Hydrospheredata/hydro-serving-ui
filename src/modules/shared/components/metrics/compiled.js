/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.hydrosphere = (function() {

    /**
     * Namespace hydrosphere.
     * @exports hydrosphere
     * @namespace
     */
    var hydrosphere = {};

    hydrosphere.monitoring = (function() {

        /**
         * Namespace monitoring.
         * @memberof hydrosphere
         * @namespace
         */
        var monitoring = {};

        monitoring.ExecutionError = (function() {

            /**
             * Properties of an ExecutionError.
             * @memberof hydrosphere.monitoring
             * @interface IExecutionError
             * @property {string|null} [errorMessage] ExecutionError errorMessage
             */

            /**
             * Constructs a new ExecutionError.
             * @memberof hydrosphere.monitoring
             * @classdesc Represents an ExecutionError.
             * @implements IExecutionError
             * @constructor
             * @param {hydrosphere.monitoring.IExecutionError=} [properties] Properties to set
             */
            function ExecutionError(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ExecutionError errorMessage.
             * @member {string} errorMessage
             * @memberof hydrosphere.monitoring.ExecutionError
             * @instance
             */
            ExecutionError.prototype.errorMessage = "";

            /**
             * Creates a new ExecutionError instance using the specified properties.
             * @function create
             * @memberof hydrosphere.monitoring.ExecutionError
             * @static
             * @param {hydrosphere.monitoring.IExecutionError=} [properties] Properties to set
             * @returns {hydrosphere.monitoring.ExecutionError} ExecutionError instance
             */
            ExecutionError.create = function create(properties) {
                return new ExecutionError(properties);
            };

            /**
             * Encodes the specified ExecutionError message. Does not implicitly {@link hydrosphere.monitoring.ExecutionError.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.monitoring.ExecutionError
             * @static
             * @param {hydrosphere.monitoring.IExecutionError} message ExecutionError message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionError.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.errorMessage);
                return writer;
            };

            /**
             * Encodes the specified ExecutionError message, length delimited. Does not implicitly {@link hydrosphere.monitoring.ExecutionError.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.monitoring.ExecutionError
             * @static
             * @param {hydrosphere.monitoring.IExecutionError} message ExecutionError message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionError.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ExecutionError message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.monitoring.ExecutionError
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.monitoring.ExecutionError} ExecutionError
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionError.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.monitoring.ExecutionError();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.errorMessage = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ExecutionError message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.monitoring.ExecutionError
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.monitoring.ExecutionError} ExecutionError
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionError.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ExecutionError message.
             * @function verify
             * @memberof hydrosphere.monitoring.ExecutionError
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ExecutionError.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    if (!$util.isString(message.errorMessage))
                        return "errorMessage: string expected";
                return null;
            };

            /**
             * Creates an ExecutionError message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.monitoring.ExecutionError
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.monitoring.ExecutionError} ExecutionError
             */
            ExecutionError.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.monitoring.ExecutionError)
                    return object;
                var message = new $root.hydrosphere.monitoring.ExecutionError();
                if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                return message;
            };

            /**
             * Creates a plain object from an ExecutionError message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.monitoring.ExecutionError
             * @static
             * @param {hydrosphere.monitoring.ExecutionError} message ExecutionError
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ExecutionError.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.errorMessage = "";
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                return object;
            };

            /**
             * Converts this ExecutionError to JSON.
             * @function toJSON
             * @memberof hydrosphere.monitoring.ExecutionError
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ExecutionError.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ExecutionError;
        })();

        monitoring.TraceData = (function() {

            /**
             * Properties of a TraceData.
             * @memberof hydrosphere.monitoring
             * @interface ITraceData
             * @property {number|Long|null} [ts] TraceData ts
             * @property {number|Long|null} [uid] TraceData uid
             */

            /**
             * Constructs a new TraceData.
             * @memberof hydrosphere.monitoring
             * @classdesc Represents a TraceData.
             * @implements ITraceData
             * @constructor
             * @param {hydrosphere.monitoring.ITraceData=} [properties] Properties to set
             */
            function TraceData(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TraceData ts.
             * @member {number|Long} ts
             * @memberof hydrosphere.monitoring.TraceData
             * @instance
             */
            TraceData.prototype.ts = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * TraceData uid.
             * @member {number|Long} uid
             * @memberof hydrosphere.monitoring.TraceData
             * @instance
             */
            TraceData.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new TraceData instance using the specified properties.
             * @function create
             * @memberof hydrosphere.monitoring.TraceData
             * @static
             * @param {hydrosphere.monitoring.ITraceData=} [properties] Properties to set
             * @returns {hydrosphere.monitoring.TraceData} TraceData instance
             */
            TraceData.create = function create(properties) {
                return new TraceData(properties);
            };

            /**
             * Encodes the specified TraceData message. Does not implicitly {@link hydrosphere.monitoring.TraceData.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.monitoring.TraceData
             * @static
             * @param {hydrosphere.monitoring.ITraceData} message TraceData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TraceData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ts != null && message.hasOwnProperty("ts"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.ts);
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.uid);
                return writer;
            };

            /**
             * Encodes the specified TraceData message, length delimited. Does not implicitly {@link hydrosphere.monitoring.TraceData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.monitoring.TraceData
             * @static
             * @param {hydrosphere.monitoring.ITraceData} message TraceData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TraceData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TraceData message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.monitoring.TraceData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.monitoring.TraceData} TraceData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TraceData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.monitoring.TraceData();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ts = reader.int64();
                        break;
                    case 2:
                        message.uid = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TraceData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.monitoring.TraceData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.monitoring.TraceData} TraceData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TraceData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TraceData message.
             * @function verify
             * @memberof hydrosphere.monitoring.TraceData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TraceData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ts != null && message.hasOwnProperty("ts"))
                    if (!$util.isInteger(message.ts) && !(message.ts && $util.isInteger(message.ts.low) && $util.isInteger(message.ts.high)))
                        return "ts: integer|Long expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                        return "uid: integer|Long expected";
                return null;
            };

            /**
             * Creates a TraceData message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.monitoring.TraceData
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.monitoring.TraceData} TraceData
             */
            TraceData.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.monitoring.TraceData)
                    return object;
                var message = new $root.hydrosphere.monitoring.TraceData();
                if (object.ts != null)
                    if ($util.Long)
                        (message.ts = $util.Long.fromValue(object.ts)).unsigned = false;
                    else if (typeof object.ts === "string")
                        message.ts = parseInt(object.ts, 10);
                    else if (typeof object.ts === "number")
                        message.ts = object.ts;
                    else if (typeof object.ts === "object")
                        message.ts = new $util.LongBits(object.ts.low >>> 0, object.ts.high >>> 0).toNumber();
                if (object.uid != null)
                    if ($util.Long)
                        (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                    else if (typeof object.uid === "string")
                        message.uid = parseInt(object.uid, 10);
                    else if (typeof object.uid === "number")
                        message.uid = object.uid;
                    else if (typeof object.uid === "object")
                        message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a TraceData message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.monitoring.TraceData
             * @static
             * @param {hydrosphere.monitoring.TraceData} message TraceData
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TraceData.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.ts = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.ts = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.uid = options.longs === String ? "0" : 0;
                }
                if (message.ts != null && message.hasOwnProperty("ts"))
                    if (typeof message.ts === "number")
                        object.ts = options.longs === String ? String(message.ts) : message.ts;
                    else
                        object.ts = options.longs === String ? $util.Long.prototype.toString.call(message.ts) : options.longs === Number ? new $util.LongBits(message.ts.low >>> 0, message.ts.high >>> 0).toNumber() : message.ts;
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (typeof message.uid === "number")
                        object.uid = options.longs === String ? String(message.uid) : message.uid;
                    else
                        object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
                return object;
            };

            /**
             * Converts this TraceData to JSON.
             * @function toJSON
             * @memberof hydrosphere.monitoring.TraceData
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TraceData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TraceData;
        })();

        monitoring.ExecutionMetadata = (function() {

            /**
             * Properties of an ExecutionMetadata.
             * @memberof hydrosphere.monitoring
             * @interface IExecutionMetadata
             * @property {number|Long|null} [applicationId] ExecutionMetadata applicationId
             * @property {string|null} [stageId] ExecutionMetadata stageId
             * @property {number|Long|null} [modelVersionId] ExecutionMetadata modelVersionId
             * @property {string|null} [signatureName] ExecutionMetadata signatureName
             * @property {string|null} [requestId] ExecutionMetadata requestId
             * @property {string|null} [applicationRequestId] ExecutionMetadata applicationRequestId
             * @property {string|null} [applicationNamespace] ExecutionMetadata applicationNamespace
             * @property {string|null} [modelName] ExecutionMetadata modelName
             * @property {hydrosphere.monitoring.ITraceData|null} [traceData] ExecutionMetadata traceData
             */

            /**
             * Constructs a new ExecutionMetadata.
             * @memberof hydrosphere.monitoring
             * @classdesc Represents an ExecutionMetadata.
             * @implements IExecutionMetadata
             * @constructor
             * @param {hydrosphere.monitoring.IExecutionMetadata=} [properties] Properties to set
             */
            function ExecutionMetadata(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ExecutionMetadata applicationId.
             * @member {number|Long} applicationId
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @instance
             */
            ExecutionMetadata.prototype.applicationId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ExecutionMetadata stageId.
             * @member {string} stageId
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @instance
             */
            ExecutionMetadata.prototype.stageId = "";

            /**
             * ExecutionMetadata modelVersionId.
             * @member {number|Long} modelVersionId
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @instance
             */
            ExecutionMetadata.prototype.modelVersionId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ExecutionMetadata signatureName.
             * @member {string} signatureName
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @instance
             */
            ExecutionMetadata.prototype.signatureName = "";

            /**
             * ExecutionMetadata requestId.
             * @member {string} requestId
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @instance
             */
            ExecutionMetadata.prototype.requestId = "";

            /**
             * ExecutionMetadata applicationRequestId.
             * @member {string} applicationRequestId
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @instance
             */
            ExecutionMetadata.prototype.applicationRequestId = "";

            /**
             * ExecutionMetadata applicationNamespace.
             * @member {string} applicationNamespace
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @instance
             */
            ExecutionMetadata.prototype.applicationNamespace = "";

            /**
             * ExecutionMetadata modelName.
             * @member {string} modelName
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @instance
             */
            ExecutionMetadata.prototype.modelName = "";

            /**
             * ExecutionMetadata traceData.
             * @member {hydrosphere.monitoring.ITraceData|null|undefined} traceData
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @instance
             */
            ExecutionMetadata.prototype.traceData = null;

            /**
             * Creates a new ExecutionMetadata instance using the specified properties.
             * @function create
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @static
             * @param {hydrosphere.monitoring.IExecutionMetadata=} [properties] Properties to set
             * @returns {hydrosphere.monitoring.ExecutionMetadata} ExecutionMetadata instance
             */
            ExecutionMetadata.create = function create(properties) {
                return new ExecutionMetadata(properties);
            };

            /**
             * Encodes the specified ExecutionMetadata message. Does not implicitly {@link hydrosphere.monitoring.ExecutionMetadata.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @static
             * @param {hydrosphere.monitoring.IExecutionMetadata} message ExecutionMetadata message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionMetadata.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.applicationId != null && message.hasOwnProperty("applicationId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.applicationId);
                if (message.stageId != null && message.hasOwnProperty("stageId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.stageId);
                if (message.modelVersionId != null && message.hasOwnProperty("modelVersionId"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.modelVersionId);
                if (message.signatureName != null && message.hasOwnProperty("signatureName"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.signatureName);
                if (message.requestId != null && message.hasOwnProperty("requestId"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.requestId);
                if (message.applicationRequestId != null && message.hasOwnProperty("applicationRequestId"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.applicationRequestId);
                if (message.applicationNamespace != null && message.hasOwnProperty("applicationNamespace"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.applicationNamespace);
                if (message.modelName != null && message.hasOwnProperty("modelName"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.modelName);
                if (message.traceData != null && message.hasOwnProperty("traceData"))
                    $root.hydrosphere.monitoring.TraceData.encode(message.traceData, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ExecutionMetadata message, length delimited. Does not implicitly {@link hydrosphere.monitoring.ExecutionMetadata.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @static
             * @param {hydrosphere.monitoring.IExecutionMetadata} message ExecutionMetadata message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionMetadata.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ExecutionMetadata message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.monitoring.ExecutionMetadata} ExecutionMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionMetadata.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.monitoring.ExecutionMetadata();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.applicationId = reader.int64();
                        break;
                    case 2:
                        message.stageId = reader.string();
                        break;
                    case 3:
                        message.modelVersionId = reader.int64();
                        break;
                    case 4:
                        message.signatureName = reader.string();
                        break;
                    case 5:
                        message.requestId = reader.string();
                        break;
                    case 6:
                        message.applicationRequestId = reader.string();
                        break;
                    case 7:
                        message.applicationNamespace = reader.string();
                        break;
                    case 8:
                        message.modelName = reader.string();
                        break;
                    case 10:
                        message.traceData = $root.hydrosphere.monitoring.TraceData.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ExecutionMetadata message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.monitoring.ExecutionMetadata} ExecutionMetadata
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionMetadata.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ExecutionMetadata message.
             * @function verify
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ExecutionMetadata.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.applicationId != null && message.hasOwnProperty("applicationId"))
                    if (!$util.isInteger(message.applicationId) && !(message.applicationId && $util.isInteger(message.applicationId.low) && $util.isInteger(message.applicationId.high)))
                        return "applicationId: integer|Long expected";
                if (message.stageId != null && message.hasOwnProperty("stageId"))
                    if (!$util.isString(message.stageId))
                        return "stageId: string expected";
                if (message.modelVersionId != null && message.hasOwnProperty("modelVersionId"))
                    if (!$util.isInteger(message.modelVersionId) && !(message.modelVersionId && $util.isInteger(message.modelVersionId.low) && $util.isInteger(message.modelVersionId.high)))
                        return "modelVersionId: integer|Long expected";
                if (message.signatureName != null && message.hasOwnProperty("signatureName"))
                    if (!$util.isString(message.signatureName))
                        return "signatureName: string expected";
                if (message.requestId != null && message.hasOwnProperty("requestId"))
                    if (!$util.isString(message.requestId))
                        return "requestId: string expected";
                if (message.applicationRequestId != null && message.hasOwnProperty("applicationRequestId"))
                    if (!$util.isString(message.applicationRequestId))
                        return "applicationRequestId: string expected";
                if (message.applicationNamespace != null && message.hasOwnProperty("applicationNamespace"))
                    if (!$util.isString(message.applicationNamespace))
                        return "applicationNamespace: string expected";
                if (message.modelName != null && message.hasOwnProperty("modelName"))
                    if (!$util.isString(message.modelName))
                        return "modelName: string expected";
                if (message.traceData != null && message.hasOwnProperty("traceData")) {
                    var error = $root.hydrosphere.monitoring.TraceData.verify(message.traceData);
                    if (error)
                        return "traceData." + error;
                }
                return null;
            };

            /**
             * Creates an ExecutionMetadata message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.monitoring.ExecutionMetadata} ExecutionMetadata
             */
            ExecutionMetadata.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.monitoring.ExecutionMetadata)
                    return object;
                var message = new $root.hydrosphere.monitoring.ExecutionMetadata();
                if (object.applicationId != null)
                    if ($util.Long)
                        (message.applicationId = $util.Long.fromValue(object.applicationId)).unsigned = false;
                    else if (typeof object.applicationId === "string")
                        message.applicationId = parseInt(object.applicationId, 10);
                    else if (typeof object.applicationId === "number")
                        message.applicationId = object.applicationId;
                    else if (typeof object.applicationId === "object")
                        message.applicationId = new $util.LongBits(object.applicationId.low >>> 0, object.applicationId.high >>> 0).toNumber();
                if (object.stageId != null)
                    message.stageId = String(object.stageId);
                if (object.modelVersionId != null)
                    if ($util.Long)
                        (message.modelVersionId = $util.Long.fromValue(object.modelVersionId)).unsigned = false;
                    else if (typeof object.modelVersionId === "string")
                        message.modelVersionId = parseInt(object.modelVersionId, 10);
                    else if (typeof object.modelVersionId === "number")
                        message.modelVersionId = object.modelVersionId;
                    else if (typeof object.modelVersionId === "object")
                        message.modelVersionId = new $util.LongBits(object.modelVersionId.low >>> 0, object.modelVersionId.high >>> 0).toNumber();
                if (object.signatureName != null)
                    message.signatureName = String(object.signatureName);
                if (object.requestId != null)
                    message.requestId = String(object.requestId);
                if (object.applicationRequestId != null)
                    message.applicationRequestId = String(object.applicationRequestId);
                if (object.applicationNamespace != null)
                    message.applicationNamespace = String(object.applicationNamespace);
                if (object.modelName != null)
                    message.modelName = String(object.modelName);
                if (object.traceData != null) {
                    if (typeof object.traceData !== "object")
                        throw TypeError(".hydrosphere.monitoring.ExecutionMetadata.traceData: object expected");
                    message.traceData = $root.hydrosphere.monitoring.TraceData.fromObject(object.traceData);
                }
                return message;
            };

            /**
             * Creates a plain object from an ExecutionMetadata message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @static
             * @param {hydrosphere.monitoring.ExecutionMetadata} message ExecutionMetadata
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ExecutionMetadata.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.applicationId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.applicationId = options.longs === String ? "0" : 0;
                    object.stageId = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.modelVersionId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.modelVersionId = options.longs === String ? "0" : 0;
                    object.signatureName = "";
                    object.requestId = "";
                    object.applicationRequestId = "";
                    object.applicationNamespace = "";
                    object.modelName = "";
                    object.traceData = null;
                }
                if (message.applicationId != null && message.hasOwnProperty("applicationId"))
                    if (typeof message.applicationId === "number")
                        object.applicationId = options.longs === String ? String(message.applicationId) : message.applicationId;
                    else
                        object.applicationId = options.longs === String ? $util.Long.prototype.toString.call(message.applicationId) : options.longs === Number ? new $util.LongBits(message.applicationId.low >>> 0, message.applicationId.high >>> 0).toNumber() : message.applicationId;
                if (message.stageId != null && message.hasOwnProperty("stageId"))
                    object.stageId = message.stageId;
                if (message.modelVersionId != null && message.hasOwnProperty("modelVersionId"))
                    if (typeof message.modelVersionId === "number")
                        object.modelVersionId = options.longs === String ? String(message.modelVersionId) : message.modelVersionId;
                    else
                        object.modelVersionId = options.longs === String ? $util.Long.prototype.toString.call(message.modelVersionId) : options.longs === Number ? new $util.LongBits(message.modelVersionId.low >>> 0, message.modelVersionId.high >>> 0).toNumber() : message.modelVersionId;
                if (message.signatureName != null && message.hasOwnProperty("signatureName"))
                    object.signatureName = message.signatureName;
                if (message.requestId != null && message.hasOwnProperty("requestId"))
                    object.requestId = message.requestId;
                if (message.applicationRequestId != null && message.hasOwnProperty("applicationRequestId"))
                    object.applicationRequestId = message.applicationRequestId;
                if (message.applicationNamespace != null && message.hasOwnProperty("applicationNamespace"))
                    object.applicationNamespace = message.applicationNamespace;
                if (message.modelName != null && message.hasOwnProperty("modelName"))
                    object.modelName = message.modelName;
                if (message.traceData != null && message.hasOwnProperty("traceData"))
                    object.traceData = $root.hydrosphere.monitoring.TraceData.toObject(message.traceData, options);
                return object;
            };

            /**
             * Converts this ExecutionMetadata to JSON.
             * @function toJSON
             * @memberof hydrosphere.monitoring.ExecutionMetadata
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ExecutionMetadata.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ExecutionMetadata;
        })();

        monitoring.ExecutionInformation = (function() {

            /**
             * Properties of an ExecutionInformation.
             * @memberof hydrosphere.monitoring
             * @interface IExecutionInformation
             * @property {hydrosphere.tensorflow.serving.IPredictRequest|null} [request] ExecutionInformation request
             * @property {hydrosphere.monitoring.IExecutionError|null} [error] ExecutionInformation error
             * @property {hydrosphere.tensorflow.serving.IPredictResponse|null} [response] ExecutionInformation response
             * @property {hydrosphere.monitoring.IExecutionMetadata|null} [metadata] ExecutionInformation metadata
             */

            /**
             * Constructs a new ExecutionInformation.
             * @memberof hydrosphere.monitoring
             * @classdesc Represents an ExecutionInformation.
             * @implements IExecutionInformation
             * @constructor
             * @param {hydrosphere.monitoring.IExecutionInformation=} [properties] Properties to set
             */
            function ExecutionInformation(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ExecutionInformation request.
             * @member {hydrosphere.tensorflow.serving.IPredictRequest|null|undefined} request
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @instance
             */
            ExecutionInformation.prototype.request = null;

            /**
             * ExecutionInformation error.
             * @member {hydrosphere.monitoring.IExecutionError|null|undefined} error
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @instance
             */
            ExecutionInformation.prototype.error = null;

            /**
             * ExecutionInformation response.
             * @member {hydrosphere.tensorflow.serving.IPredictResponse|null|undefined} response
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @instance
             */
            ExecutionInformation.prototype.response = null;

            /**
             * ExecutionInformation metadata.
             * @member {hydrosphere.monitoring.IExecutionMetadata|null|undefined} metadata
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @instance
             */
            ExecutionInformation.prototype.metadata = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * ExecutionInformation responseOrError.
             * @member {"error"|"response"|undefined} responseOrError
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @instance
             */
            Object.defineProperty(ExecutionInformation.prototype, "responseOrError", {
                get: $util.oneOfGetter($oneOfFields = ["error", "response"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ExecutionInformation instance using the specified properties.
             * @function create
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @static
             * @param {hydrosphere.monitoring.IExecutionInformation=} [properties] Properties to set
             * @returns {hydrosphere.monitoring.ExecutionInformation} ExecutionInformation instance
             */
            ExecutionInformation.create = function create(properties) {
                return new ExecutionInformation(properties);
            };

            /**
             * Encodes the specified ExecutionInformation message. Does not implicitly {@link hydrosphere.monitoring.ExecutionInformation.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @static
             * @param {hydrosphere.monitoring.IExecutionInformation} message ExecutionInformation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionInformation.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.request != null && message.hasOwnProperty("request"))
                    $root.hydrosphere.tensorflow.serving.PredictRequest.encode(message.request, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.error != null && message.hasOwnProperty("error"))
                    $root.hydrosphere.monitoring.ExecutionError.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.response != null && message.hasOwnProperty("response"))
                    $root.hydrosphere.tensorflow.serving.PredictResponse.encode(message.response, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.metadata != null && message.hasOwnProperty("metadata"))
                    $root.hydrosphere.monitoring.ExecutionMetadata.encode(message.metadata, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ExecutionInformation message, length delimited. Does not implicitly {@link hydrosphere.monitoring.ExecutionInformation.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @static
             * @param {hydrosphere.monitoring.IExecutionInformation} message ExecutionInformation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionInformation.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ExecutionInformation message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.monitoring.ExecutionInformation} ExecutionInformation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionInformation.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.monitoring.ExecutionInformation();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.request = $root.hydrosphere.tensorflow.serving.PredictRequest.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.error = $root.hydrosphere.monitoring.ExecutionError.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.response = $root.hydrosphere.tensorflow.serving.PredictResponse.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.metadata = $root.hydrosphere.monitoring.ExecutionMetadata.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ExecutionInformation message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.monitoring.ExecutionInformation} ExecutionInformation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionInformation.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ExecutionInformation message.
             * @function verify
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ExecutionInformation.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.request != null && message.hasOwnProperty("request")) {
                    var error = $root.hydrosphere.tensorflow.serving.PredictRequest.verify(message.request);
                    if (error)
                        return "request." + error;
                }
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties.responseOrError = 1;
                    {
                        var error = $root.hydrosphere.monitoring.ExecutionError.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                if (message.response != null && message.hasOwnProperty("response")) {
                    if (properties.responseOrError === 1)
                        return "responseOrError: multiple values";
                    properties.responseOrError = 1;
                    {
                        var error = $root.hydrosphere.tensorflow.serving.PredictResponse.verify(message.response);
                        if (error)
                            return "response." + error;
                    }
                }
                if (message.metadata != null && message.hasOwnProperty("metadata")) {
                    var error = $root.hydrosphere.monitoring.ExecutionMetadata.verify(message.metadata);
                    if (error)
                        return "metadata." + error;
                }
                return null;
            };

            /**
             * Creates an ExecutionInformation message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.monitoring.ExecutionInformation} ExecutionInformation
             */
            ExecutionInformation.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.monitoring.ExecutionInformation)
                    return object;
                var message = new $root.hydrosphere.monitoring.ExecutionInformation();
                if (object.request != null) {
                    if (typeof object.request !== "object")
                        throw TypeError(".hydrosphere.monitoring.ExecutionInformation.request: object expected");
                    message.request = $root.hydrosphere.tensorflow.serving.PredictRequest.fromObject(object.request);
                }
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".hydrosphere.monitoring.ExecutionInformation.error: object expected");
                    message.error = $root.hydrosphere.monitoring.ExecutionError.fromObject(object.error);
                }
                if (object.response != null) {
                    if (typeof object.response !== "object")
                        throw TypeError(".hydrosphere.monitoring.ExecutionInformation.response: object expected");
                    message.response = $root.hydrosphere.tensorflow.serving.PredictResponse.fromObject(object.response);
                }
                if (object.metadata != null) {
                    if (typeof object.metadata !== "object")
                        throw TypeError(".hydrosphere.monitoring.ExecutionInformation.metadata: object expected");
                    message.metadata = $root.hydrosphere.monitoring.ExecutionMetadata.fromObject(object.metadata);
                }
                return message;
            };

            /**
             * Creates a plain object from an ExecutionInformation message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @static
             * @param {hydrosphere.monitoring.ExecutionInformation} message ExecutionInformation
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ExecutionInformation.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.request = null;
                    object.metadata = null;
                }
                if (message.request != null && message.hasOwnProperty("request"))
                    object.request = $root.hydrosphere.tensorflow.serving.PredictRequest.toObject(message.request, options);
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.hydrosphere.monitoring.ExecutionError.toObject(message.error, options);
                    if (options.oneofs)
                        object.responseOrError = "error";
                }
                if (message.response != null && message.hasOwnProperty("response")) {
                    object.response = $root.hydrosphere.tensorflow.serving.PredictResponse.toObject(message.response, options);
                    if (options.oneofs)
                        object.responseOrError = "response";
                }
                if (message.metadata != null && message.hasOwnProperty("metadata"))
                    object.metadata = $root.hydrosphere.monitoring.ExecutionMetadata.toObject(message.metadata, options);
                return object;
            };

            /**
             * Converts this ExecutionInformation to JSON.
             * @function toJSON
             * @memberof hydrosphere.monitoring.ExecutionInformation
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ExecutionInformation.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ExecutionInformation;
        })();

        monitoring.MonitoringService = (function() {

            /**
             * Constructs a new MonitoringService service.
             * @memberof hydrosphere.monitoring
             * @classdesc Represents a MonitoringService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function MonitoringService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (MonitoringService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = MonitoringService;

            /**
             * Creates new MonitoringService service using the specified rpc implementation.
             * @function create
             * @memberof hydrosphere.monitoring.MonitoringService
             * @static
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             * @returns {MonitoringService} RPC service. Useful where requests and/or responses are streamed.
             */
            MonitoringService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                return new this(rpcImpl, requestDelimited, responseDelimited);
            };

            /**
             * Callback as used by {@link hydrosphere.monitoring.MonitoringService#analyze}.
             * @memberof hydrosphere.monitoring.MonitoringService
             * @typedef AnalyzeCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {google.protobuf.Empty} [response] Empty
             */

            /**
             * Calls Analyze.
             * @function analyze
             * @memberof hydrosphere.monitoring.MonitoringService
             * @instance
             * @param {hydrosphere.monitoring.IExecutionInformation} request ExecutionInformation message or plain object
             * @param {hydrosphere.monitoring.MonitoringService.AnalyzeCallback} callback Node-style callback called with the error, if any, and Empty
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(MonitoringService.prototype.analyze = function analyze(request, callback) {
                return this.rpcCall(analyze, $root.hydrosphere.monitoring.ExecutionInformation, $root.google.protobuf.Empty, request, callback);
            }, "name", { value: "Analyze" });

            /**
             * Calls Analyze.
             * @function analyze
             * @memberof hydrosphere.monitoring.MonitoringService
             * @instance
             * @param {hydrosphere.monitoring.IExecutionInformation} request ExecutionInformation message or plain object
             * @returns {Promise<google.protobuf.Empty>} Promise
             * @variation 2
             */

            return MonitoringService;
        })();

        return monitoring;
    })();

    hydrosphere.manager = (function() {

        /**
         * Namespace manager.
         * @memberof hydrosphere
         * @namespace
         */
        var manager = {};

        manager.KafkaError = (function() {

            /**
             * Properties of a KafkaError.
             * @memberof hydrosphere.manager
             * @interface IKafkaError
             * @property {string|null} [errorMessage] KafkaError errorMessage
             * @property {hydrosphere.tensorflow.serving.IPredictRequest|null} [lastKnownRequest] KafkaError lastKnownRequest
             */

            /**
             * Constructs a new KafkaError.
             * @memberof hydrosphere.manager
             * @classdesc Represents a KafkaError.
             * @implements IKafkaError
             * @constructor
             * @param {hydrosphere.manager.IKafkaError=} [properties] Properties to set
             */
            function KafkaError(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * KafkaError errorMessage.
             * @member {string} errorMessage
             * @memberof hydrosphere.manager.KafkaError
             * @instance
             */
            KafkaError.prototype.errorMessage = "";

            /**
             * KafkaError lastKnownRequest.
             * @member {hydrosphere.tensorflow.serving.IPredictRequest|null|undefined} lastKnownRequest
             * @memberof hydrosphere.manager.KafkaError
             * @instance
             */
            KafkaError.prototype.lastKnownRequest = null;

            /**
             * Creates a new KafkaError instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.KafkaError
             * @static
             * @param {hydrosphere.manager.IKafkaError=} [properties] Properties to set
             * @returns {hydrosphere.manager.KafkaError} KafkaError instance
             */
            KafkaError.create = function create(properties) {
                return new KafkaError(properties);
            };

            /**
             * Encodes the specified KafkaError message. Does not implicitly {@link hydrosphere.manager.KafkaError.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.KafkaError
             * @static
             * @param {hydrosphere.manager.IKafkaError} message KafkaError message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KafkaError.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.errorMessage);
                if (message.lastKnownRequest != null && message.hasOwnProperty("lastKnownRequest"))
                    $root.hydrosphere.tensorflow.serving.PredictRequest.encode(message.lastKnownRequest, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified KafkaError message, length delimited. Does not implicitly {@link hydrosphere.manager.KafkaError.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.KafkaError
             * @static
             * @param {hydrosphere.manager.IKafkaError} message KafkaError message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KafkaError.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a KafkaError message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.KafkaError
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.KafkaError} KafkaError
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KafkaError.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.KafkaError();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 5:
                        message.errorMessage = reader.string();
                        break;
                    case 8:
                        message.lastKnownRequest = $root.hydrosphere.tensorflow.serving.PredictRequest.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a KafkaError message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.KafkaError
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.KafkaError} KafkaError
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KafkaError.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a KafkaError message.
             * @function verify
             * @memberof hydrosphere.manager.KafkaError
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            KafkaError.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    if (!$util.isString(message.errorMessage))
                        return "errorMessage: string expected";
                if (message.lastKnownRequest != null && message.hasOwnProperty("lastKnownRequest")) {
                    var error = $root.hydrosphere.tensorflow.serving.PredictRequest.verify(message.lastKnownRequest);
                    if (error)
                        return "lastKnownRequest." + error;
                }
                return null;
            };

            /**
             * Creates a KafkaError message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.KafkaError
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.KafkaError} KafkaError
             */
            KafkaError.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.KafkaError)
                    return object;
                var message = new $root.hydrosphere.manager.KafkaError();
                if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                if (object.lastKnownRequest != null) {
                    if (typeof object.lastKnownRequest !== "object")
                        throw TypeError(".hydrosphere.manager.KafkaError.lastKnownRequest: object expected");
                    message.lastKnownRequest = $root.hydrosphere.tensorflow.serving.PredictRequest.fromObject(object.lastKnownRequest);
                }
                return message;
            };

            /**
             * Creates a plain object from a KafkaError message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.KafkaError
             * @static
             * @param {hydrosphere.manager.KafkaError} message KafkaError
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            KafkaError.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.errorMessage = "";
                    object.lastKnownRequest = null;
                }
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                if (message.lastKnownRequest != null && message.hasOwnProperty("lastKnownRequest"))
                    object.lastKnownRequest = $root.hydrosphere.tensorflow.serving.PredictRequest.toObject(message.lastKnownRequest, options);
                return object;
            };

            /**
             * Converts this KafkaError to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.KafkaError
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            KafkaError.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return KafkaError;
        })();

        manager.KafkaMessageLocation = (function() {

            /**
             * Properties of a KafkaMessageLocation.
             * @memberof hydrosphere.manager
             * @interface IKafkaMessageLocation
             * @property {string|null} [sourceTopic] KafkaMessageLocation sourceTopic
             * @property {string|null} [consumerId] KafkaMessageLocation consumerId
             * @property {number|Long|null} [offset] KafkaMessageLocation offset
             * @property {number|null} [partition] KafkaMessageLocation partition
             */

            /**
             * Constructs a new KafkaMessageLocation.
             * @memberof hydrosphere.manager
             * @classdesc Represents a KafkaMessageLocation.
             * @implements IKafkaMessageLocation
             * @constructor
             * @param {hydrosphere.manager.IKafkaMessageLocation=} [properties] Properties to set
             */
            function KafkaMessageLocation(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * KafkaMessageLocation sourceTopic.
             * @member {string} sourceTopic
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @instance
             */
            KafkaMessageLocation.prototype.sourceTopic = "";

            /**
             * KafkaMessageLocation consumerId.
             * @member {string} consumerId
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @instance
             */
            KafkaMessageLocation.prototype.consumerId = "";

            /**
             * KafkaMessageLocation offset.
             * @member {number|Long} offset
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @instance
             */
            KafkaMessageLocation.prototype.offset = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * KafkaMessageLocation partition.
             * @member {number} partition
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @instance
             */
            KafkaMessageLocation.prototype.partition = 0;

            /**
             * Creates a new KafkaMessageLocation instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @static
             * @param {hydrosphere.manager.IKafkaMessageLocation=} [properties] Properties to set
             * @returns {hydrosphere.manager.KafkaMessageLocation} KafkaMessageLocation instance
             */
            KafkaMessageLocation.create = function create(properties) {
                return new KafkaMessageLocation(properties);
            };

            /**
             * Encodes the specified KafkaMessageLocation message. Does not implicitly {@link hydrosphere.manager.KafkaMessageLocation.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @static
             * @param {hydrosphere.manager.IKafkaMessageLocation} message KafkaMessageLocation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KafkaMessageLocation.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.sourceTopic != null && message.hasOwnProperty("sourceTopic"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.sourceTopic);
                if (message.consumerId != null && message.hasOwnProperty("consumerId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.consumerId);
                if (message.offset != null && message.hasOwnProperty("offset"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.offset);
                if (message.partition != null && message.hasOwnProperty("partition"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.partition);
                return writer;
            };

            /**
             * Encodes the specified KafkaMessageLocation message, length delimited. Does not implicitly {@link hydrosphere.manager.KafkaMessageLocation.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @static
             * @param {hydrosphere.manager.IKafkaMessageLocation} message KafkaMessageLocation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KafkaMessageLocation.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a KafkaMessageLocation message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.KafkaMessageLocation} KafkaMessageLocation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KafkaMessageLocation.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.KafkaMessageLocation();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.sourceTopic = reader.string();
                        break;
                    case 2:
                        message.consumerId = reader.string();
                        break;
                    case 3:
                        message.offset = reader.int64();
                        break;
                    case 4:
                        message.partition = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a KafkaMessageLocation message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.KafkaMessageLocation} KafkaMessageLocation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KafkaMessageLocation.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a KafkaMessageLocation message.
             * @function verify
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            KafkaMessageLocation.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.sourceTopic != null && message.hasOwnProperty("sourceTopic"))
                    if (!$util.isString(message.sourceTopic))
                        return "sourceTopic: string expected";
                if (message.consumerId != null && message.hasOwnProperty("consumerId"))
                    if (!$util.isString(message.consumerId))
                        return "consumerId: string expected";
                if (message.offset != null && message.hasOwnProperty("offset"))
                    if (!$util.isInteger(message.offset) && !(message.offset && $util.isInteger(message.offset.low) && $util.isInteger(message.offset.high)))
                        return "offset: integer|Long expected";
                if (message.partition != null && message.hasOwnProperty("partition"))
                    if (!$util.isInteger(message.partition))
                        return "partition: integer expected";
                return null;
            };

            /**
             * Creates a KafkaMessageLocation message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.KafkaMessageLocation} KafkaMessageLocation
             */
            KafkaMessageLocation.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.KafkaMessageLocation)
                    return object;
                var message = new $root.hydrosphere.manager.KafkaMessageLocation();
                if (object.sourceTopic != null)
                    message.sourceTopic = String(object.sourceTopic);
                if (object.consumerId != null)
                    message.consumerId = String(object.consumerId);
                if (object.offset != null)
                    if ($util.Long)
                        (message.offset = $util.Long.fromValue(object.offset)).unsigned = false;
                    else if (typeof object.offset === "string")
                        message.offset = parseInt(object.offset, 10);
                    else if (typeof object.offset === "number")
                        message.offset = object.offset;
                    else if (typeof object.offset === "object")
                        message.offset = new $util.LongBits(object.offset.low >>> 0, object.offset.high >>> 0).toNumber();
                if (object.partition != null)
                    message.partition = object.partition | 0;
                return message;
            };

            /**
             * Creates a plain object from a KafkaMessageLocation message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @static
             * @param {hydrosphere.manager.KafkaMessageLocation} message KafkaMessageLocation
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            KafkaMessageLocation.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.sourceTopic = "";
                    object.consumerId = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.offset = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.offset = options.longs === String ? "0" : 0;
                    object.partition = 0;
                }
                if (message.sourceTopic != null && message.hasOwnProperty("sourceTopic"))
                    object.sourceTopic = message.sourceTopic;
                if (message.consumerId != null && message.hasOwnProperty("consumerId"))
                    object.consumerId = message.consumerId;
                if (message.offset != null && message.hasOwnProperty("offset"))
                    if (typeof message.offset === "number")
                        object.offset = options.longs === String ? String(message.offset) : message.offset;
                    else
                        object.offset = options.longs === String ? $util.Long.prototype.toString.call(message.offset) : options.longs === Number ? new $util.LongBits(message.offset.low >>> 0, message.offset.high >>> 0).toNumber() : message.offset;
                if (message.partition != null && message.hasOwnProperty("partition"))
                    object.partition = message.partition;
                return object;
            };

            /**
             * Converts this KafkaMessageLocation to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.KafkaMessageLocation
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            KafkaMessageLocation.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return KafkaMessageLocation;
        })();

        manager.KafkaMessageMeta = (function() {

            /**
             * Properties of a KafkaMessageMeta.
             * @memberof hydrosphere.manager
             * @interface IKafkaMessageMeta
             * @property {string|null} [traceId] KafkaMessageMeta traceId
             * @property {string|null} [applicationId] KafkaMessageMeta applicationId
             * @property {string|null} [stageId] KafkaMessageMeta stageId
             * @property {string|null} [stageName] KafkaMessageMeta stageName
             * @property {hydrosphere.manager.IKafkaMessageLocation|null} [location] KafkaMessageMeta location
             */

            /**
             * Constructs a new KafkaMessageMeta.
             * @memberof hydrosphere.manager
             * @classdesc Represents a KafkaMessageMeta.
             * @implements IKafkaMessageMeta
             * @constructor
             * @param {hydrosphere.manager.IKafkaMessageMeta=} [properties] Properties to set
             */
            function KafkaMessageMeta(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * KafkaMessageMeta traceId.
             * @member {string} traceId
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @instance
             */
            KafkaMessageMeta.prototype.traceId = "";

            /**
             * KafkaMessageMeta applicationId.
             * @member {string} applicationId
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @instance
             */
            KafkaMessageMeta.prototype.applicationId = "";

            /**
             * KafkaMessageMeta stageId.
             * @member {string} stageId
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @instance
             */
            KafkaMessageMeta.prototype.stageId = "";

            /**
             * KafkaMessageMeta stageName.
             * @member {string} stageName
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @instance
             */
            KafkaMessageMeta.prototype.stageName = "";

            /**
             * KafkaMessageMeta location.
             * @member {hydrosphere.manager.IKafkaMessageLocation|null|undefined} location
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @instance
             */
            KafkaMessageMeta.prototype.location = null;

            /**
             * Creates a new KafkaMessageMeta instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @static
             * @param {hydrosphere.manager.IKafkaMessageMeta=} [properties] Properties to set
             * @returns {hydrosphere.manager.KafkaMessageMeta} KafkaMessageMeta instance
             */
            KafkaMessageMeta.create = function create(properties) {
                return new KafkaMessageMeta(properties);
            };

            /**
             * Encodes the specified KafkaMessageMeta message. Does not implicitly {@link hydrosphere.manager.KafkaMessageMeta.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @static
             * @param {hydrosphere.manager.IKafkaMessageMeta} message KafkaMessageMeta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KafkaMessageMeta.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.traceId);
                if (message.applicationId != null && message.hasOwnProperty("applicationId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.applicationId);
                if (message.stageId != null && message.hasOwnProperty("stageId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.stageId);
                if (message.stageName != null && message.hasOwnProperty("stageName"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.stageName);
                if (message.location != null && message.hasOwnProperty("location"))
                    $root.hydrosphere.manager.KafkaMessageLocation.encode(message.location, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified KafkaMessageMeta message, length delimited. Does not implicitly {@link hydrosphere.manager.KafkaMessageMeta.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @static
             * @param {hydrosphere.manager.IKafkaMessageMeta} message KafkaMessageMeta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KafkaMessageMeta.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a KafkaMessageMeta message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.KafkaMessageMeta} KafkaMessageMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KafkaMessageMeta.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.KafkaMessageMeta();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.traceId = reader.string();
                        break;
                    case 2:
                        message.applicationId = reader.string();
                        break;
                    case 3:
                        message.stageId = reader.string();
                        break;
                    case 4:
                        message.stageName = reader.string();
                        break;
                    case 5:
                        message.location = $root.hydrosphere.manager.KafkaMessageLocation.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a KafkaMessageMeta message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.KafkaMessageMeta} KafkaMessageMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KafkaMessageMeta.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a KafkaMessageMeta message.
             * @function verify
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            KafkaMessageMeta.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                    if (!$util.isString(message.traceId))
                        return "traceId: string expected";
                if (message.applicationId != null && message.hasOwnProperty("applicationId"))
                    if (!$util.isString(message.applicationId))
                        return "applicationId: string expected";
                if (message.stageId != null && message.hasOwnProperty("stageId"))
                    if (!$util.isString(message.stageId))
                        return "stageId: string expected";
                if (message.stageName != null && message.hasOwnProperty("stageName"))
                    if (!$util.isString(message.stageName))
                        return "stageName: string expected";
                if (message.location != null && message.hasOwnProperty("location")) {
                    var error = $root.hydrosphere.manager.KafkaMessageLocation.verify(message.location);
                    if (error)
                        return "location." + error;
                }
                return null;
            };

            /**
             * Creates a KafkaMessageMeta message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.KafkaMessageMeta} KafkaMessageMeta
             */
            KafkaMessageMeta.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.KafkaMessageMeta)
                    return object;
                var message = new $root.hydrosphere.manager.KafkaMessageMeta();
                if (object.traceId != null)
                    message.traceId = String(object.traceId);
                if (object.applicationId != null)
                    message.applicationId = String(object.applicationId);
                if (object.stageId != null)
                    message.stageId = String(object.stageId);
                if (object.stageName != null)
                    message.stageName = String(object.stageName);
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".hydrosphere.manager.KafkaMessageMeta.location: object expected");
                    message.location = $root.hydrosphere.manager.KafkaMessageLocation.fromObject(object.location);
                }
                return message;
            };

            /**
             * Creates a plain object from a KafkaMessageMeta message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @static
             * @param {hydrosphere.manager.KafkaMessageMeta} message KafkaMessageMeta
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            KafkaMessageMeta.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.traceId = "";
                    object.applicationId = "";
                    object.stageId = "";
                    object.stageName = "";
                    object.location = null;
                }
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                    object.traceId = message.traceId;
                if (message.applicationId != null && message.hasOwnProperty("applicationId"))
                    object.applicationId = message.applicationId;
                if (message.stageId != null && message.hasOwnProperty("stageId"))
                    object.stageId = message.stageId;
                if (message.stageName != null && message.hasOwnProperty("stageName"))
                    object.stageName = message.stageName;
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.hydrosphere.manager.KafkaMessageLocation.toObject(message.location, options);
                return object;
            };

            /**
             * Converts this KafkaMessageMeta to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.KafkaMessageMeta
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            KafkaMessageMeta.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return KafkaMessageMeta;
        })();

        manager.KafkaServingMessage = (function() {

            /**
             * Properties of a KafkaServingMessage.
             * @memberof hydrosphere.manager
             * @interface IKafkaServingMessage
             * @property {hydrosphere.manager.IKafkaError|null} [error] KafkaServingMessage error
             * @property {hydrosphere.tensorflow.serving.IPredictRequest|null} [request] KafkaServingMessage request
             * @property {hydrosphere.manager.IKafkaMessageMeta|null} [meta] KafkaServingMessage meta
             */

            /**
             * Constructs a new KafkaServingMessage.
             * @memberof hydrosphere.manager
             * @classdesc Represents a KafkaServingMessage.
             * @implements IKafkaServingMessage
             * @constructor
             * @param {hydrosphere.manager.IKafkaServingMessage=} [properties] Properties to set
             */
            function KafkaServingMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * KafkaServingMessage error.
             * @member {hydrosphere.manager.IKafkaError|null|undefined} error
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @instance
             */
            KafkaServingMessage.prototype.error = null;

            /**
             * KafkaServingMessage request.
             * @member {hydrosphere.tensorflow.serving.IPredictRequest|null|undefined} request
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @instance
             */
            KafkaServingMessage.prototype.request = null;

            /**
             * KafkaServingMessage meta.
             * @member {hydrosphere.manager.IKafkaMessageMeta|null|undefined} meta
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @instance
             */
            KafkaServingMessage.prototype.meta = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * KafkaServingMessage requestOrError.
             * @member {"error"|"request"|undefined} requestOrError
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @instance
             */
            Object.defineProperty(KafkaServingMessage.prototype, "requestOrError", {
                get: $util.oneOfGetter($oneOfFields = ["error", "request"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new KafkaServingMessage instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @static
             * @param {hydrosphere.manager.IKafkaServingMessage=} [properties] Properties to set
             * @returns {hydrosphere.manager.KafkaServingMessage} KafkaServingMessage instance
             */
            KafkaServingMessage.create = function create(properties) {
                return new KafkaServingMessage(properties);
            };

            /**
             * Encodes the specified KafkaServingMessage message. Does not implicitly {@link hydrosphere.manager.KafkaServingMessage.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @static
             * @param {hydrosphere.manager.IKafkaServingMessage} message KafkaServingMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KafkaServingMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.error != null && message.hasOwnProperty("error"))
                    $root.hydrosphere.manager.KafkaError.encode(message.error, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.request != null && message.hasOwnProperty("request"))
                    $root.hydrosphere.tensorflow.serving.PredictRequest.encode(message.request, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.meta != null && message.hasOwnProperty("meta"))
                    $root.hydrosphere.manager.KafkaMessageMeta.encode(message.meta, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified KafkaServingMessage message, length delimited. Does not implicitly {@link hydrosphere.manager.KafkaServingMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @static
             * @param {hydrosphere.manager.IKafkaServingMessage} message KafkaServingMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KafkaServingMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a KafkaServingMessage message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.KafkaServingMessage} KafkaServingMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KafkaServingMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.KafkaServingMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.error = $root.hydrosphere.manager.KafkaError.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.request = $root.hydrosphere.tensorflow.serving.PredictRequest.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.meta = $root.hydrosphere.manager.KafkaMessageMeta.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a KafkaServingMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.KafkaServingMessage} KafkaServingMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KafkaServingMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a KafkaServingMessage message.
             * @function verify
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            KafkaServingMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.error != null && message.hasOwnProperty("error")) {
                    properties.requestOrError = 1;
                    {
                        var error = $root.hydrosphere.manager.KafkaError.verify(message.error);
                        if (error)
                            return "error." + error;
                    }
                }
                if (message.request != null && message.hasOwnProperty("request")) {
                    if (properties.requestOrError === 1)
                        return "requestOrError: multiple values";
                    properties.requestOrError = 1;
                    {
                        var error = $root.hydrosphere.tensorflow.serving.PredictRequest.verify(message.request);
                        if (error)
                            return "request." + error;
                    }
                }
                if (message.meta != null && message.hasOwnProperty("meta")) {
                    var error = $root.hydrosphere.manager.KafkaMessageMeta.verify(message.meta);
                    if (error)
                        return "meta." + error;
                }
                return null;
            };

            /**
             * Creates a KafkaServingMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.KafkaServingMessage} KafkaServingMessage
             */
            KafkaServingMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.KafkaServingMessage)
                    return object;
                var message = new $root.hydrosphere.manager.KafkaServingMessage();
                if (object.error != null) {
                    if (typeof object.error !== "object")
                        throw TypeError(".hydrosphere.manager.KafkaServingMessage.error: object expected");
                    message.error = $root.hydrosphere.manager.KafkaError.fromObject(object.error);
                }
                if (object.request != null) {
                    if (typeof object.request !== "object")
                        throw TypeError(".hydrosphere.manager.KafkaServingMessage.request: object expected");
                    message.request = $root.hydrosphere.tensorflow.serving.PredictRequest.fromObject(object.request);
                }
                if (object.meta != null) {
                    if (typeof object.meta !== "object")
                        throw TypeError(".hydrosphere.manager.KafkaServingMessage.meta: object expected");
                    message.meta = $root.hydrosphere.manager.KafkaMessageMeta.fromObject(object.meta);
                }
                return message;
            };

            /**
             * Creates a plain object from a KafkaServingMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @static
             * @param {hydrosphere.manager.KafkaServingMessage} message KafkaServingMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            KafkaServingMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.meta = null;
                if (message.error != null && message.hasOwnProperty("error")) {
                    object.error = $root.hydrosphere.manager.KafkaError.toObject(message.error, options);
                    if (options.oneofs)
                        object.requestOrError = "error";
                }
                if (message.request != null && message.hasOwnProperty("request")) {
                    object.request = $root.hydrosphere.tensorflow.serving.PredictRequest.toObject(message.request, options);
                    if (options.oneofs)
                        object.requestOrError = "request";
                }
                if (message.meta != null && message.hasOwnProperty("meta"))
                    object.meta = $root.hydrosphere.manager.KafkaMessageMeta.toObject(message.meta, options);
                return object;
            };

            /**
             * Converts this KafkaServingMessage to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.KafkaServingMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            KafkaServingMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return KafkaServingMessage;
        })();

        manager.ExecutionService = (function() {

            /**
             * Properties of an ExecutionService.
             * @memberof hydrosphere.manager
             * @interface IExecutionService
             * @property {hydrosphere.manager.IModelVersion|null} [modelVersion] ExecutionService modelVersion
             * @property {number|null} [weight] ExecutionService weight
             */

            /**
             * Constructs a new ExecutionService.
             * @memberof hydrosphere.manager
             * @classdesc Represents an ExecutionService.
             * @implements IExecutionService
             * @constructor
             * @param {hydrosphere.manager.IExecutionService=} [properties] Properties to set
             */
            function ExecutionService(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ExecutionService modelVersion.
             * @member {hydrosphere.manager.IModelVersion|null|undefined} modelVersion
             * @memberof hydrosphere.manager.ExecutionService
             * @instance
             */
            ExecutionService.prototype.modelVersion = null;

            /**
             * ExecutionService weight.
             * @member {number} weight
             * @memberof hydrosphere.manager.ExecutionService
             * @instance
             */
            ExecutionService.prototype.weight = 0;

            /**
             * Creates a new ExecutionService instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.ExecutionService
             * @static
             * @param {hydrosphere.manager.IExecutionService=} [properties] Properties to set
             * @returns {hydrosphere.manager.ExecutionService} ExecutionService instance
             */
            ExecutionService.create = function create(properties) {
                return new ExecutionService(properties);
            };

            /**
             * Encodes the specified ExecutionService message. Does not implicitly {@link hydrosphere.manager.ExecutionService.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.ExecutionService
             * @static
             * @param {hydrosphere.manager.IExecutionService} message ExecutionService message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionService.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.modelVersion != null && message.hasOwnProperty("modelVersion"))
                    $root.hydrosphere.manager.ModelVersion.encode(message.modelVersion, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.weight != null && message.hasOwnProperty("weight"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.weight);
                return writer;
            };

            /**
             * Encodes the specified ExecutionService message, length delimited. Does not implicitly {@link hydrosphere.manager.ExecutionService.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.ExecutionService
             * @static
             * @param {hydrosphere.manager.IExecutionService} message ExecutionService message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionService.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ExecutionService message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.ExecutionService
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.ExecutionService} ExecutionService
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionService.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.ExecutionService();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.modelVersion = $root.hydrosphere.manager.ModelVersion.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.weight = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ExecutionService message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.ExecutionService
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.ExecutionService} ExecutionService
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionService.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ExecutionService message.
             * @function verify
             * @memberof hydrosphere.manager.ExecutionService
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ExecutionService.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.modelVersion != null && message.hasOwnProperty("modelVersion")) {
                    var error = $root.hydrosphere.manager.ModelVersion.verify(message.modelVersion);
                    if (error)
                        return "modelVersion." + error;
                }
                if (message.weight != null && message.hasOwnProperty("weight"))
                    if (!$util.isInteger(message.weight))
                        return "weight: integer expected";
                return null;
            };

            /**
             * Creates an ExecutionService message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.ExecutionService
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.ExecutionService} ExecutionService
             */
            ExecutionService.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.ExecutionService)
                    return object;
                var message = new $root.hydrosphere.manager.ExecutionService();
                if (object.modelVersion != null) {
                    if (typeof object.modelVersion !== "object")
                        throw TypeError(".hydrosphere.manager.ExecutionService.modelVersion: object expected");
                    message.modelVersion = $root.hydrosphere.manager.ModelVersion.fromObject(object.modelVersion);
                }
                if (object.weight != null)
                    message.weight = object.weight | 0;
                return message;
            };

            /**
             * Creates a plain object from an ExecutionService message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.ExecutionService
             * @static
             * @param {hydrosphere.manager.ExecutionService} message ExecutionService
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ExecutionService.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.modelVersion = null;
                    object.weight = 0;
                }
                if (message.modelVersion != null && message.hasOwnProperty("modelVersion"))
                    object.modelVersion = $root.hydrosphere.manager.ModelVersion.toObject(message.modelVersion, options);
                if (message.weight != null && message.hasOwnProperty("weight"))
                    object.weight = message.weight;
                return object;
            };

            /**
             * Converts this ExecutionService to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.ExecutionService
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ExecutionService.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ExecutionService;
        })();

        manager.ExecutionStage = (function() {

            /**
             * Properties of an ExecutionStage.
             * @memberof hydrosphere.manager
             * @interface IExecutionStage
             * @property {string|null} [stageId] ExecutionStage stageId
             * @property {hydrosphere.contract.IModelSignature|null} [signature] ExecutionStage signature
             * @property {Array.<hydrosphere.manager.IExecutionService>|null} [services] ExecutionStage services
             */

            /**
             * Constructs a new ExecutionStage.
             * @memberof hydrosphere.manager
             * @classdesc Represents an ExecutionStage.
             * @implements IExecutionStage
             * @constructor
             * @param {hydrosphere.manager.IExecutionStage=} [properties] Properties to set
             */
            function ExecutionStage(properties) {
                this.services = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ExecutionStage stageId.
             * @member {string} stageId
             * @memberof hydrosphere.manager.ExecutionStage
             * @instance
             */
            ExecutionStage.prototype.stageId = "";

            /**
             * ExecutionStage signature.
             * @member {hydrosphere.contract.IModelSignature|null|undefined} signature
             * @memberof hydrosphere.manager.ExecutionStage
             * @instance
             */
            ExecutionStage.prototype.signature = null;

            /**
             * ExecutionStage services.
             * @member {Array.<hydrosphere.manager.IExecutionService>} services
             * @memberof hydrosphere.manager.ExecutionStage
             * @instance
             */
            ExecutionStage.prototype.services = $util.emptyArray;

            /**
             * Creates a new ExecutionStage instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.ExecutionStage
             * @static
             * @param {hydrosphere.manager.IExecutionStage=} [properties] Properties to set
             * @returns {hydrosphere.manager.ExecutionStage} ExecutionStage instance
             */
            ExecutionStage.create = function create(properties) {
                return new ExecutionStage(properties);
            };

            /**
             * Encodes the specified ExecutionStage message. Does not implicitly {@link hydrosphere.manager.ExecutionStage.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.ExecutionStage
             * @static
             * @param {hydrosphere.manager.IExecutionStage} message ExecutionStage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionStage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.stageId != null && message.hasOwnProperty("stageId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.stageId);
                if (message.signature != null && message.hasOwnProperty("signature"))
                    $root.hydrosphere.contract.ModelSignature.encode(message.signature, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.services != null && message.services.length)
                    for (var i = 0; i < message.services.length; ++i)
                        $root.hydrosphere.manager.ExecutionService.encode(message.services[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ExecutionStage message, length delimited. Does not implicitly {@link hydrosphere.manager.ExecutionStage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.ExecutionStage
             * @static
             * @param {hydrosphere.manager.IExecutionStage} message ExecutionStage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionStage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ExecutionStage message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.ExecutionStage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.ExecutionStage} ExecutionStage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionStage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.ExecutionStage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.stageId = reader.string();
                        break;
                    case 2:
                        message.signature = $root.hydrosphere.contract.ModelSignature.decode(reader, reader.uint32());
                        break;
                    case 3:
                        if (!(message.services && message.services.length))
                            message.services = [];
                        message.services.push($root.hydrosphere.manager.ExecutionService.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ExecutionStage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.ExecutionStage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.ExecutionStage} ExecutionStage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionStage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ExecutionStage message.
             * @function verify
             * @memberof hydrosphere.manager.ExecutionStage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ExecutionStage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.stageId != null && message.hasOwnProperty("stageId"))
                    if (!$util.isString(message.stageId))
                        return "stageId: string expected";
                if (message.signature != null && message.hasOwnProperty("signature")) {
                    var error = $root.hydrosphere.contract.ModelSignature.verify(message.signature);
                    if (error)
                        return "signature." + error;
                }
                if (message.services != null && message.hasOwnProperty("services")) {
                    if (!Array.isArray(message.services))
                        return "services: array expected";
                    for (var i = 0; i < message.services.length; ++i) {
                        var error = $root.hydrosphere.manager.ExecutionService.verify(message.services[i]);
                        if (error)
                            return "services." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an ExecutionStage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.ExecutionStage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.ExecutionStage} ExecutionStage
             */
            ExecutionStage.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.ExecutionStage)
                    return object;
                var message = new $root.hydrosphere.manager.ExecutionStage();
                if (object.stageId != null)
                    message.stageId = String(object.stageId);
                if (object.signature != null) {
                    if (typeof object.signature !== "object")
                        throw TypeError(".hydrosphere.manager.ExecutionStage.signature: object expected");
                    message.signature = $root.hydrosphere.contract.ModelSignature.fromObject(object.signature);
                }
                if (object.services) {
                    if (!Array.isArray(object.services))
                        throw TypeError(".hydrosphere.manager.ExecutionStage.services: array expected");
                    message.services = [];
                    for (var i = 0; i < object.services.length; ++i) {
                        if (typeof object.services[i] !== "object")
                            throw TypeError(".hydrosphere.manager.ExecutionStage.services: object expected");
                        message.services[i] = $root.hydrosphere.manager.ExecutionService.fromObject(object.services[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an ExecutionStage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.ExecutionStage
             * @static
             * @param {hydrosphere.manager.ExecutionStage} message ExecutionStage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ExecutionStage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.services = [];
                if (options.defaults) {
                    object.stageId = "";
                    object.signature = null;
                }
                if (message.stageId != null && message.hasOwnProperty("stageId"))
                    object.stageId = message.stageId;
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = $root.hydrosphere.contract.ModelSignature.toObject(message.signature, options);
                if (message.services && message.services.length) {
                    object.services = [];
                    for (var j = 0; j < message.services.length; ++j)
                        object.services[j] = $root.hydrosphere.manager.ExecutionService.toObject(message.services[j], options);
                }
                return object;
            };

            /**
             * Converts this ExecutionStage to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.ExecutionStage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ExecutionStage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ExecutionStage;
        })();

        manager.ExecutionGraph = (function() {

            /**
             * Properties of an ExecutionGraph.
             * @memberof hydrosphere.manager
             * @interface IExecutionGraph
             * @property {Array.<hydrosphere.manager.IExecutionStage>|null} [stages] ExecutionGraph stages
             */

            /**
             * Constructs a new ExecutionGraph.
             * @memberof hydrosphere.manager
             * @classdesc Represents an ExecutionGraph.
             * @implements IExecutionGraph
             * @constructor
             * @param {hydrosphere.manager.IExecutionGraph=} [properties] Properties to set
             */
            function ExecutionGraph(properties) {
                this.stages = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ExecutionGraph stages.
             * @member {Array.<hydrosphere.manager.IExecutionStage>} stages
             * @memberof hydrosphere.manager.ExecutionGraph
             * @instance
             */
            ExecutionGraph.prototype.stages = $util.emptyArray;

            /**
             * Creates a new ExecutionGraph instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.ExecutionGraph
             * @static
             * @param {hydrosphere.manager.IExecutionGraph=} [properties] Properties to set
             * @returns {hydrosphere.manager.ExecutionGraph} ExecutionGraph instance
             */
            ExecutionGraph.create = function create(properties) {
                return new ExecutionGraph(properties);
            };

            /**
             * Encodes the specified ExecutionGraph message. Does not implicitly {@link hydrosphere.manager.ExecutionGraph.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.ExecutionGraph
             * @static
             * @param {hydrosphere.manager.IExecutionGraph} message ExecutionGraph message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionGraph.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.stages != null && message.stages.length)
                    for (var i = 0; i < message.stages.length; ++i)
                        $root.hydrosphere.manager.ExecutionStage.encode(message.stages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ExecutionGraph message, length delimited. Does not implicitly {@link hydrosphere.manager.ExecutionGraph.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.ExecutionGraph
             * @static
             * @param {hydrosphere.manager.IExecutionGraph} message ExecutionGraph message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExecutionGraph.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ExecutionGraph message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.ExecutionGraph
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.ExecutionGraph} ExecutionGraph
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionGraph.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.ExecutionGraph();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.stages && message.stages.length))
                            message.stages = [];
                        message.stages.push($root.hydrosphere.manager.ExecutionStage.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ExecutionGraph message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.ExecutionGraph
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.ExecutionGraph} ExecutionGraph
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExecutionGraph.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ExecutionGraph message.
             * @function verify
             * @memberof hydrosphere.manager.ExecutionGraph
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ExecutionGraph.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.stages != null && message.hasOwnProperty("stages")) {
                    if (!Array.isArray(message.stages))
                        return "stages: array expected";
                    for (var i = 0; i < message.stages.length; ++i) {
                        var error = $root.hydrosphere.manager.ExecutionStage.verify(message.stages[i]);
                        if (error)
                            return "stages." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an ExecutionGraph message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.ExecutionGraph
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.ExecutionGraph} ExecutionGraph
             */
            ExecutionGraph.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.ExecutionGraph)
                    return object;
                var message = new $root.hydrosphere.manager.ExecutionGraph();
                if (object.stages) {
                    if (!Array.isArray(object.stages))
                        throw TypeError(".hydrosphere.manager.ExecutionGraph.stages: array expected");
                    message.stages = [];
                    for (var i = 0; i < object.stages.length; ++i) {
                        if (typeof object.stages[i] !== "object")
                            throw TypeError(".hydrosphere.manager.ExecutionGraph.stages: object expected");
                        message.stages[i] = $root.hydrosphere.manager.ExecutionStage.fromObject(object.stages[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an ExecutionGraph message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.ExecutionGraph
             * @static
             * @param {hydrosphere.manager.ExecutionGraph} message ExecutionGraph
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ExecutionGraph.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.stages = [];
                if (message.stages && message.stages.length) {
                    object.stages = [];
                    for (var j = 0; j < message.stages.length; ++j)
                        object.stages[j] = $root.hydrosphere.manager.ExecutionStage.toObject(message.stages[j], options);
                }
                return object;
            };

            /**
             * Converts this ExecutionGraph to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.ExecutionGraph
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ExecutionGraph.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ExecutionGraph;
        })();

        manager.KafkaStreaming = (function() {

            /**
             * Properties of a KafkaStreaming.
             * @memberof hydrosphere.manager
             * @interface IKafkaStreaming
             * @property {string|null} [consumerId] KafkaStreaming consumerId
             * @property {string|null} [sourceTopic] KafkaStreaming sourceTopic
             * @property {string|null} [destinationTopic] KafkaStreaming destinationTopic
             * @property {string|null} [errorTopic] KafkaStreaming errorTopic
             */

            /**
             * Constructs a new KafkaStreaming.
             * @memberof hydrosphere.manager
             * @classdesc Represents a KafkaStreaming.
             * @implements IKafkaStreaming
             * @constructor
             * @param {hydrosphere.manager.IKafkaStreaming=} [properties] Properties to set
             */
            function KafkaStreaming(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * KafkaStreaming consumerId.
             * @member {string} consumerId
             * @memberof hydrosphere.manager.KafkaStreaming
             * @instance
             */
            KafkaStreaming.prototype.consumerId = "";

            /**
             * KafkaStreaming sourceTopic.
             * @member {string} sourceTopic
             * @memberof hydrosphere.manager.KafkaStreaming
             * @instance
             */
            KafkaStreaming.prototype.sourceTopic = "";

            /**
             * KafkaStreaming destinationTopic.
             * @member {string} destinationTopic
             * @memberof hydrosphere.manager.KafkaStreaming
             * @instance
             */
            KafkaStreaming.prototype.destinationTopic = "";

            /**
             * KafkaStreaming errorTopic.
             * @member {string} errorTopic
             * @memberof hydrosphere.manager.KafkaStreaming
             * @instance
             */
            KafkaStreaming.prototype.errorTopic = "";

            /**
             * Creates a new KafkaStreaming instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.KafkaStreaming
             * @static
             * @param {hydrosphere.manager.IKafkaStreaming=} [properties] Properties to set
             * @returns {hydrosphere.manager.KafkaStreaming} KafkaStreaming instance
             */
            KafkaStreaming.create = function create(properties) {
                return new KafkaStreaming(properties);
            };

            /**
             * Encodes the specified KafkaStreaming message. Does not implicitly {@link hydrosphere.manager.KafkaStreaming.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.KafkaStreaming
             * @static
             * @param {hydrosphere.manager.IKafkaStreaming} message KafkaStreaming message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KafkaStreaming.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.consumerId != null && message.hasOwnProperty("consumerId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.consumerId);
                if (message.sourceTopic != null && message.hasOwnProperty("sourceTopic"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.sourceTopic);
                if (message.destinationTopic != null && message.hasOwnProperty("destinationTopic"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.destinationTopic);
                if (message.errorTopic != null && message.hasOwnProperty("errorTopic"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.errorTopic);
                return writer;
            };

            /**
             * Encodes the specified KafkaStreaming message, length delimited. Does not implicitly {@link hydrosphere.manager.KafkaStreaming.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.KafkaStreaming
             * @static
             * @param {hydrosphere.manager.IKafkaStreaming} message KafkaStreaming message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KafkaStreaming.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a KafkaStreaming message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.KafkaStreaming
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.KafkaStreaming} KafkaStreaming
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KafkaStreaming.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.KafkaStreaming();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.consumerId = reader.string();
                        break;
                    case 2:
                        message.sourceTopic = reader.string();
                        break;
                    case 3:
                        message.destinationTopic = reader.string();
                        break;
                    case 4:
                        message.errorTopic = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a KafkaStreaming message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.KafkaStreaming
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.KafkaStreaming} KafkaStreaming
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KafkaStreaming.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a KafkaStreaming message.
             * @function verify
             * @memberof hydrosphere.manager.KafkaStreaming
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            KafkaStreaming.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.consumerId != null && message.hasOwnProperty("consumerId"))
                    if (!$util.isString(message.consumerId))
                        return "consumerId: string expected";
                if (message.sourceTopic != null && message.hasOwnProperty("sourceTopic"))
                    if (!$util.isString(message.sourceTopic))
                        return "sourceTopic: string expected";
                if (message.destinationTopic != null && message.hasOwnProperty("destinationTopic"))
                    if (!$util.isString(message.destinationTopic))
                        return "destinationTopic: string expected";
                if (message.errorTopic != null && message.hasOwnProperty("errorTopic"))
                    if (!$util.isString(message.errorTopic))
                        return "errorTopic: string expected";
                return null;
            };

            /**
             * Creates a KafkaStreaming message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.KafkaStreaming
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.KafkaStreaming} KafkaStreaming
             */
            KafkaStreaming.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.KafkaStreaming)
                    return object;
                var message = new $root.hydrosphere.manager.KafkaStreaming();
                if (object.consumerId != null)
                    message.consumerId = String(object.consumerId);
                if (object.sourceTopic != null)
                    message.sourceTopic = String(object.sourceTopic);
                if (object.destinationTopic != null)
                    message.destinationTopic = String(object.destinationTopic);
                if (object.errorTopic != null)
                    message.errorTopic = String(object.errorTopic);
                return message;
            };

            /**
             * Creates a plain object from a KafkaStreaming message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.KafkaStreaming
             * @static
             * @param {hydrosphere.manager.KafkaStreaming} message KafkaStreaming
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            KafkaStreaming.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.consumerId = "";
                    object.sourceTopic = "";
                    object.destinationTopic = "";
                    object.errorTopic = "";
                }
                if (message.consumerId != null && message.hasOwnProperty("consumerId"))
                    object.consumerId = message.consumerId;
                if (message.sourceTopic != null && message.hasOwnProperty("sourceTopic"))
                    object.sourceTopic = message.sourceTopic;
                if (message.destinationTopic != null && message.hasOwnProperty("destinationTopic"))
                    object.destinationTopic = message.destinationTopic;
                if (message.errorTopic != null && message.hasOwnProperty("errorTopic"))
                    object.errorTopic = message.errorTopic;
                return object;
            };

            /**
             * Converts this KafkaStreaming to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.KafkaStreaming
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            KafkaStreaming.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return KafkaStreaming;
        })();

        manager.Application = (function() {

            /**
             * Properties of an Application.
             * @memberof hydrosphere.manager
             * @interface IApplication
             * @property {number|Long|null} [id] Application id
             * @property {string|null} [name] Application name
             * @property {hydrosphere.contract.IModelContract|null} [contract] Application contract
             * @property {hydrosphere.manager.IExecutionGraph|null} [executionGraph] Application executionGraph
             * @property {Array.<hydrosphere.manager.IKafkaStreaming>|null} [kafkaStreaming] Application kafkaStreaming
             * @property {string|null} [namespace] Application namespace
             */

            /**
             * Constructs a new Application.
             * @memberof hydrosphere.manager
             * @classdesc Represents an Application.
             * @implements IApplication
             * @constructor
             * @param {hydrosphere.manager.IApplication=} [properties] Properties to set
             */
            function Application(properties) {
                this.kafkaStreaming = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Application id.
             * @member {number|Long} id
             * @memberof hydrosphere.manager.Application
             * @instance
             */
            Application.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Application name.
             * @member {string} name
             * @memberof hydrosphere.manager.Application
             * @instance
             */
            Application.prototype.name = "";

            /**
             * Application contract.
             * @member {hydrosphere.contract.IModelContract|null|undefined} contract
             * @memberof hydrosphere.manager.Application
             * @instance
             */
            Application.prototype.contract = null;

            /**
             * Application executionGraph.
             * @member {hydrosphere.manager.IExecutionGraph|null|undefined} executionGraph
             * @memberof hydrosphere.manager.Application
             * @instance
             */
            Application.prototype.executionGraph = null;

            /**
             * Application kafkaStreaming.
             * @member {Array.<hydrosphere.manager.IKafkaStreaming>} kafkaStreaming
             * @memberof hydrosphere.manager.Application
             * @instance
             */
            Application.prototype.kafkaStreaming = $util.emptyArray;

            /**
             * Application namespace.
             * @member {string} namespace
             * @memberof hydrosphere.manager.Application
             * @instance
             */
            Application.prototype.namespace = "";

            /**
             * Creates a new Application instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.Application
             * @static
             * @param {hydrosphere.manager.IApplication=} [properties] Properties to set
             * @returns {hydrosphere.manager.Application} Application instance
             */
            Application.create = function create(properties) {
                return new Application(properties);
            };

            /**
             * Encodes the specified Application message. Does not implicitly {@link hydrosphere.manager.Application.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.Application
             * @static
             * @param {hydrosphere.manager.IApplication} message Application message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Application.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.contract != null && message.hasOwnProperty("contract"))
                    $root.hydrosphere.contract.ModelContract.encode(message.contract, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.executionGraph != null && message.hasOwnProperty("executionGraph"))
                    $root.hydrosphere.manager.ExecutionGraph.encode(message.executionGraph, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.kafkaStreaming != null && message.kafkaStreaming.length)
                    for (var i = 0; i < message.kafkaStreaming.length; ++i)
                        $root.hydrosphere.manager.KafkaStreaming.encode(message.kafkaStreaming[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.namespace != null && message.hasOwnProperty("namespace"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.namespace);
                return writer;
            };

            /**
             * Encodes the specified Application message, length delimited. Does not implicitly {@link hydrosphere.manager.Application.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.Application
             * @static
             * @param {hydrosphere.manager.IApplication} message Application message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Application.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Application message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.Application
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.Application} Application
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Application.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.Application();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int64();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.contract = $root.hydrosphere.contract.ModelContract.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.executionGraph = $root.hydrosphere.manager.ExecutionGraph.decode(reader, reader.uint32());
                        break;
                    case 5:
                        if (!(message.kafkaStreaming && message.kafkaStreaming.length))
                            message.kafkaStreaming = [];
                        message.kafkaStreaming.push($root.hydrosphere.manager.KafkaStreaming.decode(reader, reader.uint32()));
                        break;
                    case 6:
                        message.namespace = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Application message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.Application
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.Application} Application
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Application.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Application message.
             * @function verify
             * @memberof hydrosphere.manager.Application
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Application.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.contract != null && message.hasOwnProperty("contract")) {
                    var error = $root.hydrosphere.contract.ModelContract.verify(message.contract);
                    if (error)
                        return "contract." + error;
                }
                if (message.executionGraph != null && message.hasOwnProperty("executionGraph")) {
                    var error = $root.hydrosphere.manager.ExecutionGraph.verify(message.executionGraph);
                    if (error)
                        return "executionGraph." + error;
                }
                if (message.kafkaStreaming != null && message.hasOwnProperty("kafkaStreaming")) {
                    if (!Array.isArray(message.kafkaStreaming))
                        return "kafkaStreaming: array expected";
                    for (var i = 0; i < message.kafkaStreaming.length; ++i) {
                        var error = $root.hydrosphere.manager.KafkaStreaming.verify(message.kafkaStreaming[i]);
                        if (error)
                            return "kafkaStreaming." + error;
                    }
                }
                if (message.namespace != null && message.hasOwnProperty("namespace"))
                    if (!$util.isString(message.namespace))
                        return "namespace: string expected";
                return null;
            };

            /**
             * Creates an Application message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.Application
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.Application} Application
             */
            Application.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.Application)
                    return object;
                var message = new $root.hydrosphere.manager.Application();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.contract != null) {
                    if (typeof object.contract !== "object")
                        throw TypeError(".hydrosphere.manager.Application.contract: object expected");
                    message.contract = $root.hydrosphere.contract.ModelContract.fromObject(object.contract);
                }
                if (object.executionGraph != null) {
                    if (typeof object.executionGraph !== "object")
                        throw TypeError(".hydrosphere.manager.Application.executionGraph: object expected");
                    message.executionGraph = $root.hydrosphere.manager.ExecutionGraph.fromObject(object.executionGraph);
                }
                if (object.kafkaStreaming) {
                    if (!Array.isArray(object.kafkaStreaming))
                        throw TypeError(".hydrosphere.manager.Application.kafkaStreaming: array expected");
                    message.kafkaStreaming = [];
                    for (var i = 0; i < object.kafkaStreaming.length; ++i) {
                        if (typeof object.kafkaStreaming[i] !== "object")
                            throw TypeError(".hydrosphere.manager.Application.kafkaStreaming: object expected");
                        message.kafkaStreaming[i] = $root.hydrosphere.manager.KafkaStreaming.fromObject(object.kafkaStreaming[i]);
                    }
                }
                if (object.namespace != null)
                    message.namespace = String(object.namespace);
                return message;
            };

            /**
             * Creates a plain object from an Application message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.Application
             * @static
             * @param {hydrosphere.manager.Application} message Application
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Application.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.kafkaStreaming = [];
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.name = "";
                    object.contract = null;
                    object.executionGraph = null;
                    object.namespace = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.contract != null && message.hasOwnProperty("contract"))
                    object.contract = $root.hydrosphere.contract.ModelContract.toObject(message.contract, options);
                if (message.executionGraph != null && message.hasOwnProperty("executionGraph"))
                    object.executionGraph = $root.hydrosphere.manager.ExecutionGraph.toObject(message.executionGraph, options);
                if (message.kafkaStreaming && message.kafkaStreaming.length) {
                    object.kafkaStreaming = [];
                    for (var j = 0; j < message.kafkaStreaming.length; ++j)
                        object.kafkaStreaming[j] = $root.hydrosphere.manager.KafkaStreaming.toObject(message.kafkaStreaming[j], options);
                }
                if (message.namespace != null && message.hasOwnProperty("namespace"))
                    object.namespace = message.namespace;
                return object;
            };

            /**
             * Converts this Application to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.Application
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Application.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Application;
        })();

        /**
         * DataProfileType enum.
         * @name hydrosphere.manager.DataProfileType
         * @enum {string}
         * @property {number} NONE=0 NONE value
         * @property {number} CATEGORICAL=1 CATEGORICAL value
         * @property {number} NOMINAL=11 NOMINAL value
         * @property {number} ORIDNAL=12 ORIDNAL value
         * @property {number} NUMERICAL=2 NUMERICAL value
         * @property {number} CONTINUOUS=21 CONTINUOUS value
         * @property {number} INTERVAL=22 INTERVAL value
         * @property {number} RATIO=23 RATIO value
         * @property {number} IMAGE=3 IMAGE value
         * @property {number} VIDEO=4 VIDEO value
         * @property {number} AUDIO=5 AUDIO value
         * @property {number} TEXT=6 TEXT value
         */
        manager.DataProfileType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NONE"] = 0;
            values[valuesById[1] = "CATEGORICAL"] = 1;
            values[valuesById[11] = "NOMINAL"] = 11;
            values[valuesById[12] = "ORIDNAL"] = 12;
            values[valuesById[2] = "NUMERICAL"] = 2;
            values[valuesById[21] = "CONTINUOUS"] = 21;
            values[valuesById[22] = "INTERVAL"] = 22;
            values[valuesById[23] = "RATIO"] = 23;
            values[valuesById[3] = "IMAGE"] = 3;
            values[valuesById[4] = "VIDEO"] = 4;
            values[valuesById[5] = "AUDIO"] = 5;
            values[valuesById[6] = "TEXT"] = 6;
            return values;
        })();

        manager.GetVersionRequest = (function() {

            /**
             * Properties of a GetVersionRequest.
             * @memberof hydrosphere.manager
             * @interface IGetVersionRequest
             * @property {number|Long|null} [id] GetVersionRequest id
             */

            /**
             * Constructs a new GetVersionRequest.
             * @memberof hydrosphere.manager
             * @classdesc Represents a GetVersionRequest.
             * @implements IGetVersionRequest
             * @constructor
             * @param {hydrosphere.manager.IGetVersionRequest=} [properties] Properties to set
             */
            function GetVersionRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetVersionRequest id.
             * @member {number|Long} id
             * @memberof hydrosphere.manager.GetVersionRequest
             * @instance
             */
            GetVersionRequest.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new GetVersionRequest instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.GetVersionRequest
             * @static
             * @param {hydrosphere.manager.IGetVersionRequest=} [properties] Properties to set
             * @returns {hydrosphere.manager.GetVersionRequest} GetVersionRequest instance
             */
            GetVersionRequest.create = function create(properties) {
                return new GetVersionRequest(properties);
            };

            /**
             * Encodes the specified GetVersionRequest message. Does not implicitly {@link hydrosphere.manager.GetVersionRequest.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.GetVersionRequest
             * @static
             * @param {hydrosphere.manager.IGetVersionRequest} message GetVersionRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetVersionRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                return writer;
            };

            /**
             * Encodes the specified GetVersionRequest message, length delimited. Does not implicitly {@link hydrosphere.manager.GetVersionRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.GetVersionRequest
             * @static
             * @param {hydrosphere.manager.IGetVersionRequest} message GetVersionRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetVersionRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetVersionRequest message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.GetVersionRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.GetVersionRequest} GetVersionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetVersionRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.GetVersionRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetVersionRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.GetVersionRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.GetVersionRequest} GetVersionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetVersionRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetVersionRequest message.
             * @function verify
             * @memberof hydrosphere.manager.GetVersionRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetVersionRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                return null;
            };

            /**
             * Creates a GetVersionRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.GetVersionRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.GetVersionRequest} GetVersionRequest
             */
            GetVersionRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.GetVersionRequest)
                    return object;
                var message = new $root.hydrosphere.manager.GetVersionRequest();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a GetVersionRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.GetVersionRequest
             * @static
             * @param {hydrosphere.manager.GetVersionRequest} message GetVersionRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetVersionRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                return object;
            };

            /**
             * Converts this GetVersionRequest to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.GetVersionRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetVersionRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetVersionRequest;
        })();

        manager.ManagerService = (function() {

            /**
             * Constructs a new ManagerService service.
             * @memberof hydrosphere.manager
             * @classdesc Represents a ManagerService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function ManagerService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (ManagerService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = ManagerService;

            /**
             * Creates new ManagerService service using the specified rpc implementation.
             * @function create
             * @memberof hydrosphere.manager.ManagerService
             * @static
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             * @returns {ManagerService} RPC service. Useful where requests and/or responses are streamed.
             */
            ManagerService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                return new this(rpcImpl, requestDelimited, responseDelimited);
            };

            /**
             * Callback as used by {@link hydrosphere.manager.ManagerService#getAllVersions}.
             * @memberof hydrosphere.manager.ManagerService
             * @typedef GetAllVersionsCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {hydrosphere.manager.ModelVersion} [response] ModelVersion
             */

            /**
             * Calls GetAllVersions.
             * @function getAllVersions
             * @memberof hydrosphere.manager.ManagerService
             * @instance
             * @param {google.protobuf.IEmpty} request Empty message or plain object
             * @param {hydrosphere.manager.ManagerService.GetAllVersionsCallback} callback Node-style callback called with the error, if any, and ModelVersion
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ManagerService.prototype.getAllVersions = function getAllVersions(request, callback) {
                return this.rpcCall(getAllVersions, $root.google.protobuf.Empty, $root.hydrosphere.manager.ModelVersion, request, callback);
            }, "name", { value: "GetAllVersions" });

            /**
             * Calls GetAllVersions.
             * @function getAllVersions
             * @memberof hydrosphere.manager.ManagerService
             * @instance
             * @param {google.protobuf.IEmpty} request Empty message or plain object
             * @returns {Promise<hydrosphere.manager.ModelVersion>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link hydrosphere.manager.ManagerService#getVersion}.
             * @memberof hydrosphere.manager.ManagerService
             * @typedef GetVersionCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {hydrosphere.manager.ModelVersion} [response] ModelVersion
             */

            /**
             * Calls GetVersion.
             * @function getVersion
             * @memberof hydrosphere.manager.ManagerService
             * @instance
             * @param {hydrosphere.manager.IGetVersionRequest} request GetVersionRequest message or plain object
             * @param {hydrosphere.manager.ManagerService.GetVersionCallback} callback Node-style callback called with the error, if any, and ModelVersion
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ManagerService.prototype.getVersion = function getVersion(request, callback) {
                return this.rpcCall(getVersion, $root.hydrosphere.manager.GetVersionRequest, $root.hydrosphere.manager.ModelVersion, request, callback);
            }, "name", { value: "GetVersion" });

            /**
             * Calls GetVersion.
             * @function getVersion
             * @memberof hydrosphere.manager.ManagerService
             * @instance
             * @param {hydrosphere.manager.IGetVersionRequest} request GetVersionRequest message or plain object
             * @returns {Promise<hydrosphere.manager.ModelVersion>} Promise
             * @variation 2
             */

            return ManagerService;
        })();

        manager.Model = (function() {

            /**
             * Properties of a Model.
             * @memberof hydrosphere.manager
             * @interface IModel
             * @property {number|Long|null} [id] Model id
             * @property {string|null} [name] Model name
             */

            /**
             * Constructs a new Model.
             * @memberof hydrosphere.manager
             * @classdesc Represents a Model.
             * @implements IModel
             * @constructor
             * @param {hydrosphere.manager.IModel=} [properties] Properties to set
             */
            function Model(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Model id.
             * @member {number|Long} id
             * @memberof hydrosphere.manager.Model
             * @instance
             */
            Model.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Model name.
             * @member {string} name
             * @memberof hydrosphere.manager.Model
             * @instance
             */
            Model.prototype.name = "";

            /**
             * Creates a new Model instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.Model
             * @static
             * @param {hydrosphere.manager.IModel=} [properties] Properties to set
             * @returns {hydrosphere.manager.Model} Model instance
             */
            Model.create = function create(properties) {
                return new Model(properties);
            };

            /**
             * Encodes the specified Model message. Does not implicitly {@link hydrosphere.manager.Model.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.Model
             * @static
             * @param {hydrosphere.manager.IModel} message Model message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Model.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified Model message, length delimited. Does not implicitly {@link hydrosphere.manager.Model.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.Model
             * @static
             * @param {hydrosphere.manager.IModel} message Model message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Model.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Model message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.Model
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.Model} Model
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Model.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.Model();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int64();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Model message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.Model
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.Model} Model
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Model.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Model message.
             * @function verify
             * @memberof hydrosphere.manager.Model
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Model.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates a Model message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.Model
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.Model} Model
             */
            Model.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.Model)
                    return object;
                var message = new $root.hydrosphere.manager.Model();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from a Model message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.Model
             * @static
             * @param {hydrosphere.manager.Model} message Model
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Model.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.name = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this Model to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.Model
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Model.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Model;
        })();

        manager.DockerImage = (function() {

            /**
             * Properties of a DockerImage.
             * @memberof hydrosphere.manager
             * @interface IDockerImage
             * @property {string|null} [name] DockerImage name
             * @property {string|null} [tag] DockerImage tag
             */

            /**
             * Constructs a new DockerImage.
             * @memberof hydrosphere.manager
             * @classdesc Represents a DockerImage.
             * @implements IDockerImage
             * @constructor
             * @param {hydrosphere.manager.IDockerImage=} [properties] Properties to set
             */
            function DockerImage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DockerImage name.
             * @member {string} name
             * @memberof hydrosphere.manager.DockerImage
             * @instance
             */
            DockerImage.prototype.name = "";

            /**
             * DockerImage tag.
             * @member {string} tag
             * @memberof hydrosphere.manager.DockerImage
             * @instance
             */
            DockerImage.prototype.tag = "";

            /**
             * Creates a new DockerImage instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.DockerImage
             * @static
             * @param {hydrosphere.manager.IDockerImage=} [properties] Properties to set
             * @returns {hydrosphere.manager.DockerImage} DockerImage instance
             */
            DockerImage.create = function create(properties) {
                return new DockerImage(properties);
            };

            /**
             * Encodes the specified DockerImage message. Does not implicitly {@link hydrosphere.manager.DockerImage.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.DockerImage
             * @static
             * @param {hydrosphere.manager.IDockerImage} message DockerImage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DockerImage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.tag != null && message.hasOwnProperty("tag"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.tag);
                return writer;
            };

            /**
             * Encodes the specified DockerImage message, length delimited. Does not implicitly {@link hydrosphere.manager.DockerImage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.DockerImage
             * @static
             * @param {hydrosphere.manager.IDockerImage} message DockerImage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DockerImage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DockerImage message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.DockerImage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.DockerImage} DockerImage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DockerImage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.DockerImage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.tag = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DockerImage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.DockerImage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.DockerImage} DockerImage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DockerImage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DockerImage message.
             * @function verify
             * @memberof hydrosphere.manager.DockerImage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DockerImage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.tag != null && message.hasOwnProperty("tag"))
                    if (!$util.isString(message.tag))
                        return "tag: string expected";
                return null;
            };

            /**
             * Creates a DockerImage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.DockerImage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.DockerImage} DockerImage
             */
            DockerImage.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.DockerImage)
                    return object;
                var message = new $root.hydrosphere.manager.DockerImage();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.tag != null)
                    message.tag = String(object.tag);
                return message;
            };

            /**
             * Creates a plain object from a DockerImage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.DockerImage
             * @static
             * @param {hydrosphere.manager.DockerImage} message DockerImage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DockerImage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.tag = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.tag != null && message.hasOwnProperty("tag"))
                    object.tag = message.tag;
                return object;
            };

            /**
             * Converts this DockerImage to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.DockerImage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DockerImage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DockerImage;
        })();

        manager.ModelVersion = (function() {

            /**
             * Properties of a ModelVersion.
             * @memberof hydrosphere.manager
             * @interface IModelVersion
             * @property {number|Long|null} [id] ModelVersion id
             * @property {number|Long|null} [version] ModelVersion version
             * @property {string|null} [modelType] ModelVersion modelType
             * @property {string|null} [status] ModelVersion status
             * @property {hydrosphere.manager.IHostSelector|null} [selector] ModelVersion selector
             * @property {hydrosphere.manager.IModel|null} [model] ModelVersion model
             * @property {hydrosphere.contract.IModelContract|null} [contract] ModelVersion contract
             * @property {Object.<string,hydrosphere.manager.DataProfileType>|null} [dataTypes] ModelVersion dataTypes
             * @property {hydrosphere.manager.IDockerImage|null} [image] ModelVersion image
             * @property {string|null} [imageSha] ModelVersion imageSha
             * @property {hydrosphere.manager.IDockerImage|null} [runtime] ModelVersion runtime
             */

            /**
             * Constructs a new ModelVersion.
             * @memberof hydrosphere.manager
             * @classdesc Represents a ModelVersion.
             * @implements IModelVersion
             * @constructor
             * @param {hydrosphere.manager.IModelVersion=} [properties] Properties to set
             */
            function ModelVersion(properties) {
                this.dataTypes = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ModelVersion id.
             * @member {number|Long} id
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ModelVersion version.
             * @member {number|Long} version
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.version = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ModelVersion modelType.
             * @member {string} modelType
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.modelType = "";

            /**
             * ModelVersion status.
             * @member {string} status
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.status = "";

            /**
             * ModelVersion selector.
             * @member {hydrosphere.manager.IHostSelector|null|undefined} selector
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.selector = null;

            /**
             * ModelVersion model.
             * @member {hydrosphere.manager.IModel|null|undefined} model
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.model = null;

            /**
             * ModelVersion contract.
             * @member {hydrosphere.contract.IModelContract|null|undefined} contract
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.contract = null;

            /**
             * ModelVersion dataTypes.
             * @member {Object.<string,hydrosphere.manager.DataProfileType>} dataTypes
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.dataTypes = $util.emptyObject;

            /**
             * ModelVersion image.
             * @member {hydrosphere.manager.IDockerImage|null|undefined} image
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.image = null;

            /**
             * ModelVersion imageSha.
             * @member {string} imageSha
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.imageSha = "";

            /**
             * ModelVersion runtime.
             * @member {hydrosphere.manager.IDockerImage|null|undefined} runtime
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             */
            ModelVersion.prototype.runtime = null;

            /**
             * Creates a new ModelVersion instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.ModelVersion
             * @static
             * @param {hydrosphere.manager.IModelVersion=} [properties] Properties to set
             * @returns {hydrosphere.manager.ModelVersion} ModelVersion instance
             */
            ModelVersion.create = function create(properties) {
                return new ModelVersion(properties);
            };

            /**
             * Encodes the specified ModelVersion message. Does not implicitly {@link hydrosphere.manager.ModelVersion.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.ModelVersion
             * @static
             * @param {hydrosphere.manager.IModelVersion} message ModelVersion message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelVersion.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.version);
                if (message.modelType != null && message.hasOwnProperty("modelType"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.modelType);
                if (message.status != null && message.hasOwnProperty("status"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.status);
                if (message.selector != null && message.hasOwnProperty("selector"))
                    $root.hydrosphere.manager.HostSelector.encode(message.selector, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.model != null && message.hasOwnProperty("model"))
                    $root.hydrosphere.manager.Model.encode(message.model, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.contract != null && message.hasOwnProperty("contract"))
                    $root.hydrosphere.contract.ModelContract.encode(message.contract, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.dataTypes != null && message.hasOwnProperty("dataTypes"))
                    for (var keys = Object.keys(message.dataTypes), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 8, wireType 2 =*/66).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.dataTypes[keys[i]]).ldelim();
                if (message.image != null && message.hasOwnProperty("image"))
                    $root.hydrosphere.manager.DockerImage.encode(message.image, writer.uint32(/* id 31, wireType 2 =*/250).fork()).ldelim();
                if (message.imageSha != null && message.hasOwnProperty("imageSha"))
                    writer.uint32(/* id 32, wireType 2 =*/258).string(message.imageSha);
                if (message.runtime != null && message.hasOwnProperty("runtime"))
                    $root.hydrosphere.manager.DockerImage.encode(message.runtime, writer.uint32(/* id 33, wireType 2 =*/266).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ModelVersion message, length delimited. Does not implicitly {@link hydrosphere.manager.ModelVersion.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.ModelVersion
             * @static
             * @param {hydrosphere.manager.IModelVersion} message ModelVersion message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelVersion.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ModelVersion message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.ModelVersion
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.ModelVersion} ModelVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelVersion.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.ModelVersion(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int64();
                        break;
                    case 2:
                        message.version = reader.int64();
                        break;
                    case 3:
                        message.modelType = reader.string();
                        break;
                    case 4:
                        message.status = reader.string();
                        break;
                    case 5:
                        message.selector = $root.hydrosphere.manager.HostSelector.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.model = $root.hydrosphere.manager.Model.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.contract = $root.hydrosphere.contract.ModelContract.decode(reader, reader.uint32());
                        break;
                    case 8:
                        reader.skip().pos++;
                        if (message.dataTypes === $util.emptyObject)
                            message.dataTypes = {};
                        key = reader.string();
                        reader.pos++;
                        message.dataTypes[key] = reader.int32();
                        break;
                    case 31:
                        message.image = $root.hydrosphere.manager.DockerImage.decode(reader, reader.uint32());
                        break;
                    case 32:
                        message.imageSha = reader.string();
                        break;
                    case 33:
                        message.runtime = $root.hydrosphere.manager.DockerImage.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ModelVersion message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.ModelVersion
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.ModelVersion} ModelVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelVersion.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ModelVersion message.
             * @function verify
             * @memberof hydrosphere.manager.ModelVersion
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ModelVersion.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isInteger(message.version) && !(message.version && $util.isInteger(message.version.low) && $util.isInteger(message.version.high)))
                        return "version: integer|Long expected";
                if (message.modelType != null && message.hasOwnProperty("modelType"))
                    if (!$util.isString(message.modelType))
                        return "modelType: string expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isString(message.status))
                        return "status: string expected";
                if (message.selector != null && message.hasOwnProperty("selector")) {
                    var error = $root.hydrosphere.manager.HostSelector.verify(message.selector);
                    if (error)
                        return "selector." + error;
                }
                if (message.model != null && message.hasOwnProperty("model")) {
                    var error = $root.hydrosphere.manager.Model.verify(message.model);
                    if (error)
                        return "model." + error;
                }
                if (message.contract != null && message.hasOwnProperty("contract")) {
                    var error = $root.hydrosphere.contract.ModelContract.verify(message.contract);
                    if (error)
                        return "contract." + error;
                }
                if (message.dataTypes != null && message.hasOwnProperty("dataTypes")) {
                    if (!$util.isObject(message.dataTypes))
                        return "dataTypes: object expected";
                    var key = Object.keys(message.dataTypes);
                    for (var i = 0; i < key.length; ++i)
                        switch (message.dataTypes[key[i]]) {
                        default:
                            return "dataTypes: enum value{k:string} expected";
                        case 0:
                        case 1:
                        case 11:
                        case 12:
                        case 2:
                        case 21:
                        case 22:
                        case 23:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            break;
                        }
                }
                if (message.image != null && message.hasOwnProperty("image")) {
                    var error = $root.hydrosphere.manager.DockerImage.verify(message.image);
                    if (error)
                        return "image." + error;
                }
                if (message.imageSha != null && message.hasOwnProperty("imageSha"))
                    if (!$util.isString(message.imageSha))
                        return "imageSha: string expected";
                if (message.runtime != null && message.hasOwnProperty("runtime")) {
                    var error = $root.hydrosphere.manager.DockerImage.verify(message.runtime);
                    if (error)
                        return "runtime." + error;
                }
                return null;
            };

            /**
             * Creates a ModelVersion message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.ModelVersion
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.ModelVersion} ModelVersion
             */
            ModelVersion.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.ModelVersion)
                    return object;
                var message = new $root.hydrosphere.manager.ModelVersion();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                if (object.version != null)
                    if ($util.Long)
                        (message.version = $util.Long.fromValue(object.version)).unsigned = false;
                    else if (typeof object.version === "string")
                        message.version = parseInt(object.version, 10);
                    else if (typeof object.version === "number")
                        message.version = object.version;
                    else if (typeof object.version === "object")
                        message.version = new $util.LongBits(object.version.low >>> 0, object.version.high >>> 0).toNumber();
                if (object.modelType != null)
                    message.modelType = String(object.modelType);
                if (object.status != null)
                    message.status = String(object.status);
                if (object.selector != null) {
                    if (typeof object.selector !== "object")
                        throw TypeError(".hydrosphere.manager.ModelVersion.selector: object expected");
                    message.selector = $root.hydrosphere.manager.HostSelector.fromObject(object.selector);
                }
                if (object.model != null) {
                    if (typeof object.model !== "object")
                        throw TypeError(".hydrosphere.manager.ModelVersion.model: object expected");
                    message.model = $root.hydrosphere.manager.Model.fromObject(object.model);
                }
                if (object.contract != null) {
                    if (typeof object.contract !== "object")
                        throw TypeError(".hydrosphere.manager.ModelVersion.contract: object expected");
                    message.contract = $root.hydrosphere.contract.ModelContract.fromObject(object.contract);
                }
                if (object.dataTypes) {
                    if (typeof object.dataTypes !== "object")
                        throw TypeError(".hydrosphere.manager.ModelVersion.dataTypes: object expected");
                    message.dataTypes = {};
                    for (var keys = Object.keys(object.dataTypes), i = 0; i < keys.length; ++i)
                        switch (object.dataTypes[keys[i]]) {
                        case "NONE":
                        case 0:
                            message.dataTypes[keys[i]] = 0;
                            break;
                        case "CATEGORICAL":
                        case 1:
                            message.dataTypes[keys[i]] = 1;
                            break;
                        case "NOMINAL":
                        case 11:
                            message.dataTypes[keys[i]] = 11;
                            break;
                        case "ORIDNAL":
                        case 12:
                            message.dataTypes[keys[i]] = 12;
                            break;
                        case "NUMERICAL":
                        case 2:
                            message.dataTypes[keys[i]] = 2;
                            break;
                        case "CONTINUOUS":
                        case 21:
                            message.dataTypes[keys[i]] = 21;
                            break;
                        case "INTERVAL":
                        case 22:
                            message.dataTypes[keys[i]] = 22;
                            break;
                        case "RATIO":
                        case 23:
                            message.dataTypes[keys[i]] = 23;
                            break;
                        case "IMAGE":
                        case 3:
                            message.dataTypes[keys[i]] = 3;
                            break;
                        case "VIDEO":
                        case 4:
                            message.dataTypes[keys[i]] = 4;
                            break;
                        case "AUDIO":
                        case 5:
                            message.dataTypes[keys[i]] = 5;
                            break;
                        case "TEXT":
                        case 6:
                            message.dataTypes[keys[i]] = 6;
                            break;
                        }
                }
                if (object.image != null) {
                    if (typeof object.image !== "object")
                        throw TypeError(".hydrosphere.manager.ModelVersion.image: object expected");
                    message.image = $root.hydrosphere.manager.DockerImage.fromObject(object.image);
                }
                if (object.imageSha != null)
                    message.imageSha = String(object.imageSha);
                if (object.runtime != null) {
                    if (typeof object.runtime !== "object")
                        throw TypeError(".hydrosphere.manager.ModelVersion.runtime: object expected");
                    message.runtime = $root.hydrosphere.manager.DockerImage.fromObject(object.runtime);
                }
                return message;
            };

            /**
             * Creates a plain object from a ModelVersion message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.ModelVersion
             * @static
             * @param {hydrosphere.manager.ModelVersion} message ModelVersion
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ModelVersion.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.dataTypes = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.version = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.version = options.longs === String ? "0" : 0;
                    object.modelType = "";
                    object.status = "";
                    object.selector = null;
                    object.model = null;
                    object.contract = null;
                    object.image = null;
                    object.imageSha = "";
                    object.runtime = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                if (message.version != null && message.hasOwnProperty("version"))
                    if (typeof message.version === "number")
                        object.version = options.longs === String ? String(message.version) : message.version;
                    else
                        object.version = options.longs === String ? $util.Long.prototype.toString.call(message.version) : options.longs === Number ? new $util.LongBits(message.version.low >>> 0, message.version.high >>> 0).toNumber() : message.version;
                if (message.modelType != null && message.hasOwnProperty("modelType"))
                    object.modelType = message.modelType;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                if (message.selector != null && message.hasOwnProperty("selector"))
                    object.selector = $root.hydrosphere.manager.HostSelector.toObject(message.selector, options);
                if (message.model != null && message.hasOwnProperty("model"))
                    object.model = $root.hydrosphere.manager.Model.toObject(message.model, options);
                if (message.contract != null && message.hasOwnProperty("contract"))
                    object.contract = $root.hydrosphere.contract.ModelContract.toObject(message.contract, options);
                var keys2;
                if (message.dataTypes && (keys2 = Object.keys(message.dataTypes)).length) {
                    object.dataTypes = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.dataTypes[keys2[j]] = options.enums === String ? $root.hydrosphere.manager.DataProfileType[message.dataTypes[keys2[j]]] : message.dataTypes[keys2[j]];
                }
                if (message.image != null && message.hasOwnProperty("image"))
                    object.image = $root.hydrosphere.manager.DockerImage.toObject(message.image, options);
                if (message.imageSha != null && message.hasOwnProperty("imageSha"))
                    object.imageSha = message.imageSha;
                if (message.runtime != null && message.hasOwnProperty("runtime"))
                    object.runtime = $root.hydrosphere.manager.DockerImage.toObject(message.runtime, options);
                return object;
            };

            /**
             * Converts this ModelVersion to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.ModelVersion
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ModelVersion.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ModelVersion;
        })();

        manager.HostSelector = (function() {

            /**
             * Properties of a HostSelector.
             * @memberof hydrosphere.manager
             * @interface IHostSelector
             * @property {number|Long|null} [id] HostSelector id
             * @property {string|null} [name] HostSelector name
             */

            /**
             * Constructs a new HostSelector.
             * @memberof hydrosphere.manager
             * @classdesc Represents a HostSelector.
             * @implements IHostSelector
             * @constructor
             * @param {hydrosphere.manager.IHostSelector=} [properties] Properties to set
             */
            function HostSelector(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * HostSelector id.
             * @member {number|Long} id
             * @memberof hydrosphere.manager.HostSelector
             * @instance
             */
            HostSelector.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * HostSelector name.
             * @member {string} name
             * @memberof hydrosphere.manager.HostSelector
             * @instance
             */
            HostSelector.prototype.name = "";

            /**
             * Creates a new HostSelector instance using the specified properties.
             * @function create
             * @memberof hydrosphere.manager.HostSelector
             * @static
             * @param {hydrosphere.manager.IHostSelector=} [properties] Properties to set
             * @returns {hydrosphere.manager.HostSelector} HostSelector instance
             */
            HostSelector.create = function create(properties) {
                return new HostSelector(properties);
            };

            /**
             * Encodes the specified HostSelector message. Does not implicitly {@link hydrosphere.manager.HostSelector.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.manager.HostSelector
             * @static
             * @param {hydrosphere.manager.IHostSelector} message HostSelector message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HostSelector.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified HostSelector message, length delimited. Does not implicitly {@link hydrosphere.manager.HostSelector.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.manager.HostSelector
             * @static
             * @param {hydrosphere.manager.IHostSelector} message HostSelector message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HostSelector.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a HostSelector message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.manager.HostSelector
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.manager.HostSelector} HostSelector
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HostSelector.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.manager.HostSelector();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int64();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a HostSelector message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.manager.HostSelector
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.manager.HostSelector} HostSelector
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HostSelector.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a HostSelector message.
             * @function verify
             * @memberof hydrosphere.manager.HostSelector
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HostSelector.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates a HostSelector message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.manager.HostSelector
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.manager.HostSelector} HostSelector
             */
            HostSelector.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.manager.HostSelector)
                    return object;
                var message = new $root.hydrosphere.manager.HostSelector();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from a HostSelector message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.manager.HostSelector
             * @static
             * @param {hydrosphere.manager.HostSelector} message HostSelector
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HostSelector.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.name = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this HostSelector to JSON.
             * @function toJSON
             * @memberof hydrosphere.manager.HostSelector
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HostSelector.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return HostSelector;
        })();

        return manager;
    })();

    hydrosphere.tensorflow = (function() {

        /**
         * Namespace tensorflow.
         * @memberof hydrosphere
         * @namespace
         */
        var tensorflow = {};

        tensorflow.serving = (function() {

            /**
             * Namespace serving.
             * @memberof hydrosphere.tensorflow
             * @namespace
             */
            var serving = {};

            serving.PredictRequest = (function() {

                /**
                 * Properties of a PredictRequest.
                 * @memberof hydrosphere.tensorflow.serving
                 * @interface IPredictRequest
                 * @property {hydrosphere.tensorflow.serving.IModelSpec|null} [modelSpec] PredictRequest modelSpec
                 * @property {Object.<string,hydrosphere.tensorflow.ITensorProto>|null} [inputs] PredictRequest inputs
                 */

                /**
                 * Constructs a new PredictRequest.
                 * @memberof hydrosphere.tensorflow.serving
                 * @classdesc Represents a PredictRequest.
                 * @implements IPredictRequest
                 * @constructor
                 * @param {hydrosphere.tensorflow.serving.IPredictRequest=} [properties] Properties to set
                 */
                function PredictRequest(properties) {
                    this.inputs = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PredictRequest modelSpec.
                 * @member {hydrosphere.tensorflow.serving.IModelSpec|null|undefined} modelSpec
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @instance
                 */
                PredictRequest.prototype.modelSpec = null;

                /**
                 * PredictRequest inputs.
                 * @member {Object.<string,hydrosphere.tensorflow.ITensorProto>} inputs
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @instance
                 */
                PredictRequest.prototype.inputs = $util.emptyObject;

                /**
                 * Creates a new PredictRequest instance using the specified properties.
                 * @function create
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @static
                 * @param {hydrosphere.tensorflow.serving.IPredictRequest=} [properties] Properties to set
                 * @returns {hydrosphere.tensorflow.serving.PredictRequest} PredictRequest instance
                 */
                PredictRequest.create = function create(properties) {
                    return new PredictRequest(properties);
                };

                /**
                 * Encodes the specified PredictRequest message. Does not implicitly {@link hydrosphere.tensorflow.serving.PredictRequest.verify|verify} messages.
                 * @function encode
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @static
                 * @param {hydrosphere.tensorflow.serving.IPredictRequest} message PredictRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PredictRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.modelSpec != null && message.hasOwnProperty("modelSpec"))
                        $root.hydrosphere.tensorflow.serving.ModelSpec.encode(message.modelSpec, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.inputs != null && message.hasOwnProperty("inputs"))
                        for (var keys = Object.keys(message.inputs), i = 0; i < keys.length; ++i) {
                            writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                            $root.hydrosphere.tensorflow.TensorProto.encode(message.inputs[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                        }
                    return writer;
                };

                /**
                 * Encodes the specified PredictRequest message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.serving.PredictRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @static
                 * @param {hydrosphere.tensorflow.serving.IPredictRequest} message PredictRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PredictRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a PredictRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hydrosphere.tensorflow.serving.PredictRequest} PredictRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PredictRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.tensorflow.serving.PredictRequest(), key;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.modelSpec = $root.hydrosphere.tensorflow.serving.ModelSpec.decode(reader, reader.uint32());
                            break;
                        case 2:
                            reader.skip().pos++;
                            if (message.inputs === $util.emptyObject)
                                message.inputs = {};
                            key = reader.string();
                            reader.pos++;
                            message.inputs[key] = $root.hydrosphere.tensorflow.TensorProto.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PredictRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hydrosphere.tensorflow.serving.PredictRequest} PredictRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PredictRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PredictRequest message.
                 * @function verify
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PredictRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.modelSpec != null && message.hasOwnProperty("modelSpec")) {
                        var error = $root.hydrosphere.tensorflow.serving.ModelSpec.verify(message.modelSpec);
                        if (error)
                            return "modelSpec." + error;
                    }
                    if (message.inputs != null && message.hasOwnProperty("inputs")) {
                        if (!$util.isObject(message.inputs))
                            return "inputs: object expected";
                        var key = Object.keys(message.inputs);
                        for (var i = 0; i < key.length; ++i) {
                            var error = $root.hydrosphere.tensorflow.TensorProto.verify(message.inputs[key[i]]);
                            if (error)
                                return "inputs." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a PredictRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hydrosphere.tensorflow.serving.PredictRequest} PredictRequest
                 */
                PredictRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.hydrosphere.tensorflow.serving.PredictRequest)
                        return object;
                    var message = new $root.hydrosphere.tensorflow.serving.PredictRequest();
                    if (object.modelSpec != null) {
                        if (typeof object.modelSpec !== "object")
                            throw TypeError(".hydrosphere.tensorflow.serving.PredictRequest.modelSpec: object expected");
                        message.modelSpec = $root.hydrosphere.tensorflow.serving.ModelSpec.fromObject(object.modelSpec);
                    }
                    if (object.inputs) {
                        if (typeof object.inputs !== "object")
                            throw TypeError(".hydrosphere.tensorflow.serving.PredictRequest.inputs: object expected");
                        message.inputs = {};
                        for (var keys = Object.keys(object.inputs), i = 0; i < keys.length; ++i) {
                            if (typeof object.inputs[keys[i]] !== "object")
                                throw TypeError(".hydrosphere.tensorflow.serving.PredictRequest.inputs: object expected");
                            message.inputs[keys[i]] = $root.hydrosphere.tensorflow.TensorProto.fromObject(object.inputs[keys[i]]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a PredictRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @static
                 * @param {hydrosphere.tensorflow.serving.PredictRequest} message PredictRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PredictRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.objects || options.defaults)
                        object.inputs = {};
                    if (options.defaults)
                        object.modelSpec = null;
                    if (message.modelSpec != null && message.hasOwnProperty("modelSpec"))
                        object.modelSpec = $root.hydrosphere.tensorflow.serving.ModelSpec.toObject(message.modelSpec, options);
                    var keys2;
                    if (message.inputs && (keys2 = Object.keys(message.inputs)).length) {
                        object.inputs = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.inputs[keys2[j]] = $root.hydrosphere.tensorflow.TensorProto.toObject(message.inputs[keys2[j]], options);
                    }
                    return object;
                };

                /**
                 * Converts this PredictRequest to JSON.
                 * @function toJSON
                 * @memberof hydrosphere.tensorflow.serving.PredictRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PredictRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return PredictRequest;
            })();

            serving.PredictResponse = (function() {

                /**
                 * Properties of a PredictResponse.
                 * @memberof hydrosphere.tensorflow.serving
                 * @interface IPredictResponse
                 * @property {Object.<string,hydrosphere.tensorflow.ITensorProto>|null} [outputs] PredictResponse outputs
                 * @property {Object.<string,hydrosphere.tensorflow.ITensorProto>|null} [internalInfo] PredictResponse internalInfo
                 */

                /**
                 * Constructs a new PredictResponse.
                 * @memberof hydrosphere.tensorflow.serving
                 * @classdesc Represents a PredictResponse.
                 * @implements IPredictResponse
                 * @constructor
                 * @param {hydrosphere.tensorflow.serving.IPredictResponse=} [properties] Properties to set
                 */
                function PredictResponse(properties) {
                    this.outputs = {};
                    this.internalInfo = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PredictResponse outputs.
                 * @member {Object.<string,hydrosphere.tensorflow.ITensorProto>} outputs
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @instance
                 */
                PredictResponse.prototype.outputs = $util.emptyObject;

                /**
                 * PredictResponse internalInfo.
                 * @member {Object.<string,hydrosphere.tensorflow.ITensorProto>} internalInfo
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @instance
                 */
                PredictResponse.prototype.internalInfo = $util.emptyObject;

                /**
                 * Creates a new PredictResponse instance using the specified properties.
                 * @function create
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @static
                 * @param {hydrosphere.tensorflow.serving.IPredictResponse=} [properties] Properties to set
                 * @returns {hydrosphere.tensorflow.serving.PredictResponse} PredictResponse instance
                 */
                PredictResponse.create = function create(properties) {
                    return new PredictResponse(properties);
                };

                /**
                 * Encodes the specified PredictResponse message. Does not implicitly {@link hydrosphere.tensorflow.serving.PredictResponse.verify|verify} messages.
                 * @function encode
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @static
                 * @param {hydrosphere.tensorflow.serving.IPredictResponse} message PredictResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PredictResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.outputs != null && message.hasOwnProperty("outputs"))
                        for (var keys = Object.keys(message.outputs), i = 0; i < keys.length; ++i) {
                            writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                            $root.hydrosphere.tensorflow.TensorProto.encode(message.outputs[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                        }
                    if (message.internalInfo != null && message.hasOwnProperty("internalInfo"))
                        for (var keys = Object.keys(message.internalInfo), i = 0; i < keys.length; ++i) {
                            writer.uint32(/* id 101, wireType 2 =*/810).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                            $root.hydrosphere.tensorflow.TensorProto.encode(message.internalInfo[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                        }
                    return writer;
                };

                /**
                 * Encodes the specified PredictResponse message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.serving.PredictResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @static
                 * @param {hydrosphere.tensorflow.serving.IPredictResponse} message PredictResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PredictResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a PredictResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hydrosphere.tensorflow.serving.PredictResponse} PredictResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PredictResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.tensorflow.serving.PredictResponse(), key;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            reader.skip().pos++;
                            if (message.outputs === $util.emptyObject)
                                message.outputs = {};
                            key = reader.string();
                            reader.pos++;
                            message.outputs[key] = $root.hydrosphere.tensorflow.TensorProto.decode(reader, reader.uint32());
                            break;
                        case 101:
                            reader.skip().pos++;
                            if (message.internalInfo === $util.emptyObject)
                                message.internalInfo = {};
                            key = reader.string();
                            reader.pos++;
                            message.internalInfo[key] = $root.hydrosphere.tensorflow.TensorProto.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PredictResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hydrosphere.tensorflow.serving.PredictResponse} PredictResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PredictResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PredictResponse message.
                 * @function verify
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PredictResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.outputs != null && message.hasOwnProperty("outputs")) {
                        if (!$util.isObject(message.outputs))
                            return "outputs: object expected";
                        var key = Object.keys(message.outputs);
                        for (var i = 0; i < key.length; ++i) {
                            var error = $root.hydrosphere.tensorflow.TensorProto.verify(message.outputs[key[i]]);
                            if (error)
                                return "outputs." + error;
                        }
                    }
                    if (message.internalInfo != null && message.hasOwnProperty("internalInfo")) {
                        if (!$util.isObject(message.internalInfo))
                            return "internalInfo: object expected";
                        var key = Object.keys(message.internalInfo);
                        for (var i = 0; i < key.length; ++i) {
                            var error = $root.hydrosphere.tensorflow.TensorProto.verify(message.internalInfo[key[i]]);
                            if (error)
                                return "internalInfo." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a PredictResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hydrosphere.tensorflow.serving.PredictResponse} PredictResponse
                 */
                PredictResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.hydrosphere.tensorflow.serving.PredictResponse)
                        return object;
                    var message = new $root.hydrosphere.tensorflow.serving.PredictResponse();
                    if (object.outputs) {
                        if (typeof object.outputs !== "object")
                            throw TypeError(".hydrosphere.tensorflow.serving.PredictResponse.outputs: object expected");
                        message.outputs = {};
                        for (var keys = Object.keys(object.outputs), i = 0; i < keys.length; ++i) {
                            if (typeof object.outputs[keys[i]] !== "object")
                                throw TypeError(".hydrosphere.tensorflow.serving.PredictResponse.outputs: object expected");
                            message.outputs[keys[i]] = $root.hydrosphere.tensorflow.TensorProto.fromObject(object.outputs[keys[i]]);
                        }
                    }
                    if (object.internalInfo) {
                        if (typeof object.internalInfo !== "object")
                            throw TypeError(".hydrosphere.tensorflow.serving.PredictResponse.internalInfo: object expected");
                        message.internalInfo = {};
                        for (var keys = Object.keys(object.internalInfo), i = 0; i < keys.length; ++i) {
                            if (typeof object.internalInfo[keys[i]] !== "object")
                                throw TypeError(".hydrosphere.tensorflow.serving.PredictResponse.internalInfo: object expected");
                            message.internalInfo[keys[i]] = $root.hydrosphere.tensorflow.TensorProto.fromObject(object.internalInfo[keys[i]]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a PredictResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @static
                 * @param {hydrosphere.tensorflow.serving.PredictResponse} message PredictResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PredictResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.objects || options.defaults) {
                        object.outputs = {};
                        object.internalInfo = {};
                    }
                    var keys2;
                    if (message.outputs && (keys2 = Object.keys(message.outputs)).length) {
                        object.outputs = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.outputs[keys2[j]] = $root.hydrosphere.tensorflow.TensorProto.toObject(message.outputs[keys2[j]], options);
                    }
                    if (message.internalInfo && (keys2 = Object.keys(message.internalInfo)).length) {
                        object.internalInfo = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.internalInfo[keys2[j]] = $root.hydrosphere.tensorflow.TensorProto.toObject(message.internalInfo[keys2[j]], options);
                    }
                    return object;
                };

                /**
                 * Converts this PredictResponse to JSON.
                 * @function toJSON
                 * @memberof hydrosphere.tensorflow.serving.PredictResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PredictResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return PredictResponse;
            })();

            serving.ModelSpec = (function() {

                /**
                 * Properties of a ModelSpec.
                 * @memberof hydrosphere.tensorflow.serving
                 * @interface IModelSpec
                 * @property {string|null} [name] ModelSpec name
                 * @property {google.protobuf.IInt64Value|null} [version] ModelSpec version
                 * @property {string|null} [signatureName] ModelSpec signatureName
                 */

                /**
                 * Constructs a new ModelSpec.
                 * @memberof hydrosphere.tensorflow.serving
                 * @classdesc Represents a ModelSpec.
                 * @implements IModelSpec
                 * @constructor
                 * @param {hydrosphere.tensorflow.serving.IModelSpec=} [properties] Properties to set
                 */
                function ModelSpec(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ModelSpec name.
                 * @member {string} name
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @instance
                 */
                ModelSpec.prototype.name = "";

                /**
                 * ModelSpec version.
                 * @member {google.protobuf.IInt64Value|null|undefined} version
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @instance
                 */
                ModelSpec.prototype.version = null;

                /**
                 * ModelSpec signatureName.
                 * @member {string} signatureName
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @instance
                 */
                ModelSpec.prototype.signatureName = "";

                /**
                 * Creates a new ModelSpec instance using the specified properties.
                 * @function create
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @static
                 * @param {hydrosphere.tensorflow.serving.IModelSpec=} [properties] Properties to set
                 * @returns {hydrosphere.tensorflow.serving.ModelSpec} ModelSpec instance
                 */
                ModelSpec.create = function create(properties) {
                    return new ModelSpec(properties);
                };

                /**
                 * Encodes the specified ModelSpec message. Does not implicitly {@link hydrosphere.tensorflow.serving.ModelSpec.verify|verify} messages.
                 * @function encode
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @static
                 * @param {hydrosphere.tensorflow.serving.IModelSpec} message ModelSpec message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ModelSpec.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    if (message.version != null && message.hasOwnProperty("version"))
                        $root.google.protobuf.Int64Value.encode(message.version, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.signatureName != null && message.hasOwnProperty("signatureName"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.signatureName);
                    return writer;
                };

                /**
                 * Encodes the specified ModelSpec message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.serving.ModelSpec.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @static
                 * @param {hydrosphere.tensorflow.serving.IModelSpec} message ModelSpec message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ModelSpec.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ModelSpec message from the specified reader or buffer.
                 * @function decode
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hydrosphere.tensorflow.serving.ModelSpec} ModelSpec
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ModelSpec.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.tensorflow.serving.ModelSpec();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.name = reader.string();
                            break;
                        case 2:
                            message.version = $root.google.protobuf.Int64Value.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.signatureName = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ModelSpec message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hydrosphere.tensorflow.serving.ModelSpec} ModelSpec
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ModelSpec.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ModelSpec message.
                 * @function verify
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ModelSpec.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.version != null && message.hasOwnProperty("version")) {
                        var error = $root.google.protobuf.Int64Value.verify(message.version);
                        if (error)
                            return "version." + error;
                    }
                    if (message.signatureName != null && message.hasOwnProperty("signatureName"))
                        if (!$util.isString(message.signatureName))
                            return "signatureName: string expected";
                    return null;
                };

                /**
                 * Creates a ModelSpec message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hydrosphere.tensorflow.serving.ModelSpec} ModelSpec
                 */
                ModelSpec.fromObject = function fromObject(object) {
                    if (object instanceof $root.hydrosphere.tensorflow.serving.ModelSpec)
                        return object;
                    var message = new $root.hydrosphere.tensorflow.serving.ModelSpec();
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.version != null) {
                        if (typeof object.version !== "object")
                            throw TypeError(".hydrosphere.tensorflow.serving.ModelSpec.version: object expected");
                        message.version = $root.google.protobuf.Int64Value.fromObject(object.version);
                    }
                    if (object.signatureName != null)
                        message.signatureName = String(object.signatureName);
                    return message;
                };

                /**
                 * Creates a plain object from a ModelSpec message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @static
                 * @param {hydrosphere.tensorflow.serving.ModelSpec} message ModelSpec
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ModelSpec.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.version = null;
                        object.signatureName = "";
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.version != null && message.hasOwnProperty("version"))
                        object.version = $root.google.protobuf.Int64Value.toObject(message.version, options);
                    if (message.signatureName != null && message.hasOwnProperty("signatureName"))
                        object.signatureName = message.signatureName;
                    return object;
                };

                /**
                 * Converts this ModelSpec to JSON.
                 * @function toJSON
                 * @memberof hydrosphere.tensorflow.serving.ModelSpec
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ModelSpec.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ModelSpec;
            })();

            return serving;
        })();

        tensorflow.TensorProto = (function() {

            /**
             * Properties of a TensorProto.
             * @memberof hydrosphere.tensorflow
             * @interface ITensorProto
             * @property {hydrosphere.tensorflow.DataType|null} [dtype] TensorProto dtype
             * @property {hydrosphere.tensorflow.ITensorShapeProto|null} [tensorShape] TensorProto tensorShape
             * @property {number|null} [versionNumber] TensorProto versionNumber
             * @property {Uint8Array|null} [tensorContent] TensorProto tensorContent
             * @property {Array.<number>|null} [halfVal] TensorProto halfVal
             * @property {Array.<number>|null} [floatVal] TensorProto floatVal
             * @property {Array.<number>|null} [doubleVal] TensorProto doubleVal
             * @property {Array.<number>|null} [intVal] TensorProto intVal
             * @property {Array.<Uint8Array>|null} [stringVal] TensorProto stringVal
             * @property {Array.<number>|null} [scomplexVal] TensorProto scomplexVal
             * @property {Array.<number|Long>|null} [int64Val] TensorProto int64Val
             * @property {Array.<boolean>|null} [boolVal] TensorProto boolVal
             * @property {Array.<number>|null} [dcomplexVal] TensorProto dcomplexVal
             * @property {Array.<hydrosphere.tensorflow.IVariantTensorDataProto>|null} [variantVal] TensorProto variantVal
             * @property {Array.<number>|null} [uint32Val] TensorProto uint32Val
             * @property {Array.<number|Long>|null} [uint64Val] TensorProto uint64Val
             * @property {Array.<hydrosphere.tensorflow.IMapTensorData>|null} [mapVal] TensorProto mapVal
             */

            /**
             * Constructs a new TensorProto.
             * @memberof hydrosphere.tensorflow
             * @classdesc Represents a TensorProto.
             * @implements ITensorProto
             * @constructor
             * @param {hydrosphere.tensorflow.ITensorProto=} [properties] Properties to set
             */
            function TensorProto(properties) {
                this.halfVal = [];
                this.floatVal = [];
                this.doubleVal = [];
                this.intVal = [];
                this.stringVal = [];
                this.scomplexVal = [];
                this.int64Val = [];
                this.boolVal = [];
                this.dcomplexVal = [];
                this.variantVal = [];
                this.uint32Val = [];
                this.uint64Val = [];
                this.mapVal = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TensorProto dtype.
             * @member {hydrosphere.tensorflow.DataType} dtype
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.dtype = 0;

            /**
             * TensorProto tensorShape.
             * @member {hydrosphere.tensorflow.ITensorShapeProto|null|undefined} tensorShape
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.tensorShape = null;

            /**
             * TensorProto versionNumber.
             * @member {number} versionNumber
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.versionNumber = 0;

            /**
             * TensorProto tensorContent.
             * @member {Uint8Array} tensorContent
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.tensorContent = $util.newBuffer([]);

            /**
             * TensorProto halfVal.
             * @member {Array.<number>} halfVal
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.halfVal = $util.emptyArray;

            /**
             * TensorProto floatVal.
             * @member {Array.<number>} floatVal
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.floatVal = $util.emptyArray;

            /**
             * TensorProto doubleVal.
             * @member {Array.<number>} doubleVal
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.doubleVal = $util.emptyArray;

            /**
             * TensorProto intVal.
             * @member {Array.<number>} intVal
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.intVal = $util.emptyArray;

            /**
             * TensorProto stringVal.
             * @member {Array.<Uint8Array>} stringVal
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.stringVal = $util.emptyArray;

            /**
             * TensorProto scomplexVal.
             * @member {Array.<number>} scomplexVal
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.scomplexVal = $util.emptyArray;

            /**
             * TensorProto int64Val.
             * @member {Array.<number|Long>} int64Val
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.int64Val = $util.emptyArray;

            /**
             * TensorProto boolVal.
             * @member {Array.<boolean>} boolVal
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.boolVal = $util.emptyArray;

            /**
             * TensorProto dcomplexVal.
             * @member {Array.<number>} dcomplexVal
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.dcomplexVal = $util.emptyArray;

            /**
             * TensorProto variantVal.
             * @member {Array.<hydrosphere.tensorflow.IVariantTensorDataProto>} variantVal
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.variantVal = $util.emptyArray;

            /**
             * TensorProto uint32Val.
             * @member {Array.<number>} uint32Val
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.uint32Val = $util.emptyArray;

            /**
             * TensorProto uint64Val.
             * @member {Array.<number|Long>} uint64Val
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.uint64Val = $util.emptyArray;

            /**
             * TensorProto mapVal.
             * @member {Array.<hydrosphere.tensorflow.IMapTensorData>} mapVal
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             */
            TensorProto.prototype.mapVal = $util.emptyArray;

            /**
             * Creates a new TensorProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.tensorflow.TensorProto
             * @static
             * @param {hydrosphere.tensorflow.ITensorProto=} [properties] Properties to set
             * @returns {hydrosphere.tensorflow.TensorProto} TensorProto instance
             */
            TensorProto.create = function create(properties) {
                return new TensorProto(properties);
            };

            /**
             * Encodes the specified TensorProto message. Does not implicitly {@link hydrosphere.tensorflow.TensorProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.tensorflow.TensorProto
             * @static
             * @param {hydrosphere.tensorflow.ITensorProto} message TensorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TensorProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.dtype != null && message.hasOwnProperty("dtype"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.dtype);
                if (message.tensorShape != null && message.hasOwnProperty("tensorShape"))
                    $root.hydrosphere.tensorflow.TensorShapeProto.encode(message.tensorShape, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.versionNumber != null && message.hasOwnProperty("versionNumber"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.versionNumber);
                if (message.tensorContent != null && message.hasOwnProperty("tensorContent"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.tensorContent);
                if (message.floatVal != null && message.floatVal.length) {
                    writer.uint32(/* id 5, wireType 2 =*/42).fork();
                    for (var i = 0; i < message.floatVal.length; ++i)
                        writer.float(message.floatVal[i]);
                    writer.ldelim();
                }
                if (message.doubleVal != null && message.doubleVal.length) {
                    writer.uint32(/* id 6, wireType 2 =*/50).fork();
                    for (var i = 0; i < message.doubleVal.length; ++i)
                        writer.double(message.doubleVal[i]);
                    writer.ldelim();
                }
                if (message.intVal != null && message.intVal.length) {
                    writer.uint32(/* id 7, wireType 2 =*/58).fork();
                    for (var i = 0; i < message.intVal.length; ++i)
                        writer.int32(message.intVal[i]);
                    writer.ldelim();
                }
                if (message.stringVal != null && message.stringVal.length)
                    for (var i = 0; i < message.stringVal.length; ++i)
                        writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.stringVal[i]);
                if (message.scomplexVal != null && message.scomplexVal.length) {
                    writer.uint32(/* id 9, wireType 2 =*/74).fork();
                    for (var i = 0; i < message.scomplexVal.length; ++i)
                        writer.float(message.scomplexVal[i]);
                    writer.ldelim();
                }
                if (message.int64Val != null && message.int64Val.length) {
                    writer.uint32(/* id 10, wireType 2 =*/82).fork();
                    for (var i = 0; i < message.int64Val.length; ++i)
                        writer.int64(message.int64Val[i]);
                    writer.ldelim();
                }
                if (message.boolVal != null && message.boolVal.length) {
                    writer.uint32(/* id 11, wireType 2 =*/90).fork();
                    for (var i = 0; i < message.boolVal.length; ++i)
                        writer.bool(message.boolVal[i]);
                    writer.ldelim();
                }
                if (message.dcomplexVal != null && message.dcomplexVal.length) {
                    writer.uint32(/* id 12, wireType 2 =*/98).fork();
                    for (var i = 0; i < message.dcomplexVal.length; ++i)
                        writer.double(message.dcomplexVal[i]);
                    writer.ldelim();
                }
                if (message.halfVal != null && message.halfVal.length) {
                    writer.uint32(/* id 13, wireType 2 =*/106).fork();
                    for (var i = 0; i < message.halfVal.length; ++i)
                        writer.int32(message.halfVal[i]);
                    writer.ldelim();
                }
                if (message.variantVal != null && message.variantVal.length)
                    for (var i = 0; i < message.variantVal.length; ++i)
                        $root.hydrosphere.tensorflow.VariantTensorDataProto.encode(message.variantVal[i], writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                if (message.uint32Val != null && message.uint32Val.length) {
                    writer.uint32(/* id 16, wireType 2 =*/130).fork();
                    for (var i = 0; i < message.uint32Val.length; ++i)
                        writer.uint32(message.uint32Val[i]);
                    writer.ldelim();
                }
                if (message.uint64Val != null && message.uint64Val.length) {
                    writer.uint32(/* id 17, wireType 2 =*/138).fork();
                    for (var i = 0; i < message.uint64Val.length; ++i)
                        writer.uint64(message.uint64Val[i]);
                    writer.ldelim();
                }
                if (message.mapVal != null && message.mapVal.length)
                    for (var i = 0; i < message.mapVal.length; ++i)
                        $root.hydrosphere.tensorflow.MapTensorData.encode(message.mapVal[i], writer.uint32(/* id 27, wireType 2 =*/218).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TensorProto message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.TensorProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.tensorflow.TensorProto
             * @static
             * @param {hydrosphere.tensorflow.ITensorProto} message TensorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TensorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TensorProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.tensorflow.TensorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.tensorflow.TensorProto} TensorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.tensorflow.TensorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.dtype = reader.int32();
                        break;
                    case 2:
                        message.tensorShape = $root.hydrosphere.tensorflow.TensorShapeProto.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.versionNumber = reader.int32();
                        break;
                    case 4:
                        message.tensorContent = reader.bytes();
                        break;
                    case 13:
                        if (!(message.halfVal && message.halfVal.length))
                            message.halfVal = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.halfVal.push(reader.int32());
                        } else
                            message.halfVal.push(reader.int32());
                        break;
                    case 5:
                        if (!(message.floatVal && message.floatVal.length))
                            message.floatVal = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.floatVal.push(reader.float());
                        } else
                            message.floatVal.push(reader.float());
                        break;
                    case 6:
                        if (!(message.doubleVal && message.doubleVal.length))
                            message.doubleVal = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.doubleVal.push(reader.double());
                        } else
                            message.doubleVal.push(reader.double());
                        break;
                    case 7:
                        if (!(message.intVal && message.intVal.length))
                            message.intVal = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.intVal.push(reader.int32());
                        } else
                            message.intVal.push(reader.int32());
                        break;
                    case 8:
                        if (!(message.stringVal && message.stringVal.length))
                            message.stringVal = [];
                        message.stringVal.push(reader.bytes());
                        break;
                    case 9:
                        if (!(message.scomplexVal && message.scomplexVal.length))
                            message.scomplexVal = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.scomplexVal.push(reader.float());
                        } else
                            message.scomplexVal.push(reader.float());
                        break;
                    case 10:
                        if (!(message.int64Val && message.int64Val.length))
                            message.int64Val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.int64Val.push(reader.int64());
                        } else
                            message.int64Val.push(reader.int64());
                        break;
                    case 11:
                        if (!(message.boolVal && message.boolVal.length))
                            message.boolVal = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.boolVal.push(reader.bool());
                        } else
                            message.boolVal.push(reader.bool());
                        break;
                    case 12:
                        if (!(message.dcomplexVal && message.dcomplexVal.length))
                            message.dcomplexVal = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.dcomplexVal.push(reader.double());
                        } else
                            message.dcomplexVal.push(reader.double());
                        break;
                    case 15:
                        if (!(message.variantVal && message.variantVal.length))
                            message.variantVal = [];
                        message.variantVal.push($root.hydrosphere.tensorflow.VariantTensorDataProto.decode(reader, reader.uint32()));
                        break;
                    case 16:
                        if (!(message.uint32Val && message.uint32Val.length))
                            message.uint32Val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.uint32Val.push(reader.uint32());
                        } else
                            message.uint32Val.push(reader.uint32());
                        break;
                    case 17:
                        if (!(message.uint64Val && message.uint64Val.length))
                            message.uint64Val = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.uint64Val.push(reader.uint64());
                        } else
                            message.uint64Val.push(reader.uint64());
                        break;
                    case 27:
                        if (!(message.mapVal && message.mapVal.length))
                            message.mapVal = [];
                        message.mapVal.push($root.hydrosphere.tensorflow.MapTensorData.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TensorProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.tensorflow.TensorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.tensorflow.TensorProto} TensorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TensorProto message.
             * @function verify
             * @memberof hydrosphere.tensorflow.TensorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TensorProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.dtype != null && message.hasOwnProperty("dtype"))
                    switch (message.dtype) {
                    default:
                        return "dtype: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 27:
                        break;
                    }
                if (message.tensorShape != null && message.hasOwnProperty("tensorShape")) {
                    var error = $root.hydrosphere.tensorflow.TensorShapeProto.verify(message.tensorShape);
                    if (error)
                        return "tensorShape." + error;
                }
                if (message.versionNumber != null && message.hasOwnProperty("versionNumber"))
                    if (!$util.isInteger(message.versionNumber))
                        return "versionNumber: integer expected";
                if (message.tensorContent != null && message.hasOwnProperty("tensorContent"))
                    if (!(message.tensorContent && typeof message.tensorContent.length === "number" || $util.isString(message.tensorContent)))
                        return "tensorContent: buffer expected";
                if (message.halfVal != null && message.hasOwnProperty("halfVal")) {
                    if (!Array.isArray(message.halfVal))
                        return "halfVal: array expected";
                    for (var i = 0; i < message.halfVal.length; ++i)
                        if (!$util.isInteger(message.halfVal[i]))
                            return "halfVal: integer[] expected";
                }
                if (message.floatVal != null && message.hasOwnProperty("floatVal")) {
                    if (!Array.isArray(message.floatVal))
                        return "floatVal: array expected";
                    for (var i = 0; i < message.floatVal.length; ++i)
                        if (typeof message.floatVal[i] !== "number")
                            return "floatVal: number[] expected";
                }
                if (message.doubleVal != null && message.hasOwnProperty("doubleVal")) {
                    if (!Array.isArray(message.doubleVal))
                        return "doubleVal: array expected";
                    for (var i = 0; i < message.doubleVal.length; ++i)
                        if (typeof message.doubleVal[i] !== "number")
                            return "doubleVal: number[] expected";
                }
                if (message.intVal != null && message.hasOwnProperty("intVal")) {
                    if (!Array.isArray(message.intVal))
                        return "intVal: array expected";
                    for (var i = 0; i < message.intVal.length; ++i)
                        if (!$util.isInteger(message.intVal[i]))
                            return "intVal: integer[] expected";
                }
                if (message.stringVal != null && message.hasOwnProperty("stringVal")) {
                    if (!Array.isArray(message.stringVal))
                        return "stringVal: array expected";
                    for (var i = 0; i < message.stringVal.length; ++i)
                        if (!(message.stringVal[i] && typeof message.stringVal[i].length === "number" || $util.isString(message.stringVal[i])))
                            return "stringVal: buffer[] expected";
                }
                if (message.scomplexVal != null && message.hasOwnProperty("scomplexVal")) {
                    if (!Array.isArray(message.scomplexVal))
                        return "scomplexVal: array expected";
                    for (var i = 0; i < message.scomplexVal.length; ++i)
                        if (typeof message.scomplexVal[i] !== "number")
                            return "scomplexVal: number[] expected";
                }
                if (message.int64Val != null && message.hasOwnProperty("int64Val")) {
                    if (!Array.isArray(message.int64Val))
                        return "int64Val: array expected";
                    for (var i = 0; i < message.int64Val.length; ++i)
                        if (!$util.isInteger(message.int64Val[i]) && !(message.int64Val[i] && $util.isInteger(message.int64Val[i].low) && $util.isInteger(message.int64Val[i].high)))
                            return "int64Val: integer|Long[] expected";
                }
                if (message.boolVal != null && message.hasOwnProperty("boolVal")) {
                    if (!Array.isArray(message.boolVal))
                        return "boolVal: array expected";
                    for (var i = 0; i < message.boolVal.length; ++i)
                        if (typeof message.boolVal[i] !== "boolean")
                            return "boolVal: boolean[] expected";
                }
                if (message.dcomplexVal != null && message.hasOwnProperty("dcomplexVal")) {
                    if (!Array.isArray(message.dcomplexVal))
                        return "dcomplexVal: array expected";
                    for (var i = 0; i < message.dcomplexVal.length; ++i)
                        if (typeof message.dcomplexVal[i] !== "number")
                            return "dcomplexVal: number[] expected";
                }
                if (message.variantVal != null && message.hasOwnProperty("variantVal")) {
                    if (!Array.isArray(message.variantVal))
                        return "variantVal: array expected";
                    for (var i = 0; i < message.variantVal.length; ++i) {
                        var error = $root.hydrosphere.tensorflow.VariantTensorDataProto.verify(message.variantVal[i]);
                        if (error)
                            return "variantVal." + error;
                    }
                }
                if (message.uint32Val != null && message.hasOwnProperty("uint32Val")) {
                    if (!Array.isArray(message.uint32Val))
                        return "uint32Val: array expected";
                    for (var i = 0; i < message.uint32Val.length; ++i)
                        if (!$util.isInteger(message.uint32Val[i]))
                            return "uint32Val: integer[] expected";
                }
                if (message.uint64Val != null && message.hasOwnProperty("uint64Val")) {
                    if (!Array.isArray(message.uint64Val))
                        return "uint64Val: array expected";
                    for (var i = 0; i < message.uint64Val.length; ++i)
                        if (!$util.isInteger(message.uint64Val[i]) && !(message.uint64Val[i] && $util.isInteger(message.uint64Val[i].low) && $util.isInteger(message.uint64Val[i].high)))
                            return "uint64Val: integer|Long[] expected";
                }
                if (message.mapVal != null && message.hasOwnProperty("mapVal")) {
                    if (!Array.isArray(message.mapVal))
                        return "mapVal: array expected";
                    for (var i = 0; i < message.mapVal.length; ++i) {
                        var error = $root.hydrosphere.tensorflow.MapTensorData.verify(message.mapVal[i]);
                        if (error)
                            return "mapVal." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a TensorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.tensorflow.TensorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.tensorflow.TensorProto} TensorProto
             */
            TensorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.tensorflow.TensorProto)
                    return object;
                var message = new $root.hydrosphere.tensorflow.TensorProto();
                switch (object.dtype) {
                case "DT_INVALID":
                case 0:
                    message.dtype = 0;
                    break;
                case "DT_FLOAT":
                case 1:
                    message.dtype = 1;
                    break;
                case "DT_DOUBLE":
                case 2:
                    message.dtype = 2;
                    break;
                case "DT_INT32":
                case 3:
                    message.dtype = 3;
                    break;
                case "DT_UINT8":
                case 4:
                    message.dtype = 4;
                    break;
                case "DT_INT16":
                case 5:
                    message.dtype = 5;
                    break;
                case "DT_INT8":
                case 6:
                    message.dtype = 6;
                    break;
                case "DT_STRING":
                case 7:
                    message.dtype = 7;
                    break;
                case "DT_COMPLEX64":
                case 8:
                    message.dtype = 8;
                    break;
                case "DT_INT64":
                case 9:
                    message.dtype = 9;
                    break;
                case "DT_BOOL":
                case 10:
                    message.dtype = 10;
                    break;
                case "DT_QINT8":
                case 11:
                    message.dtype = 11;
                    break;
                case "DT_QUINT8":
                case 12:
                    message.dtype = 12;
                    break;
                case "DT_QINT32":
                case 13:
                    message.dtype = 13;
                    break;
                case "DT_BFLOAT16":
                case 14:
                    message.dtype = 14;
                    break;
                case "DT_QINT16":
                case 15:
                    message.dtype = 15;
                    break;
                case "DT_QUINT16":
                case 16:
                    message.dtype = 16;
                    break;
                case "DT_UINT16":
                case 17:
                    message.dtype = 17;
                    break;
                case "DT_COMPLEX128":
                case 18:
                    message.dtype = 18;
                    break;
                case "DT_HALF":
                case 19:
                    message.dtype = 19;
                    break;
                case "DT_RESOURCE":
                case 20:
                    message.dtype = 20;
                    break;
                case "DT_VARIANT":
                case 21:
                    message.dtype = 21;
                    break;
                case "DT_UINT32":
                case 22:
                    message.dtype = 22;
                    break;
                case "DT_UINT64":
                case 23:
                    message.dtype = 23;
                    break;
                case "DT_MAP":
                case 27:
                    message.dtype = 27;
                    break;
                }
                if (object.tensorShape != null) {
                    if (typeof object.tensorShape !== "object")
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.tensorShape: object expected");
                    message.tensorShape = $root.hydrosphere.tensorflow.TensorShapeProto.fromObject(object.tensorShape);
                }
                if (object.versionNumber != null)
                    message.versionNumber = object.versionNumber | 0;
                if (object.tensorContent != null)
                    if (typeof object.tensorContent === "string")
                        $util.base64.decode(object.tensorContent, message.tensorContent = $util.newBuffer($util.base64.length(object.tensorContent)), 0);
                    else if (object.tensorContent.length)
                        message.tensorContent = object.tensorContent;
                if (object.halfVal) {
                    if (!Array.isArray(object.halfVal))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.halfVal: array expected");
                    message.halfVal = [];
                    for (var i = 0; i < object.halfVal.length; ++i)
                        message.halfVal[i] = object.halfVal[i] | 0;
                }
                if (object.floatVal) {
                    if (!Array.isArray(object.floatVal))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.floatVal: array expected");
                    message.floatVal = [];
                    for (var i = 0; i < object.floatVal.length; ++i)
                        message.floatVal[i] = Number(object.floatVal[i]);
                }
                if (object.doubleVal) {
                    if (!Array.isArray(object.doubleVal))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.doubleVal: array expected");
                    message.doubleVal = [];
                    for (var i = 0; i < object.doubleVal.length; ++i)
                        message.doubleVal[i] = Number(object.doubleVal[i]);
                }
                if (object.intVal) {
                    if (!Array.isArray(object.intVal))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.intVal: array expected");
                    message.intVal = [];
                    for (var i = 0; i < object.intVal.length; ++i)
                        message.intVal[i] = object.intVal[i] | 0;
                }
                if (object.stringVal) {
                    if (!Array.isArray(object.stringVal))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.stringVal: array expected");
                    message.stringVal = [];
                    for (var i = 0; i < object.stringVal.length; ++i)
                        if (typeof object.stringVal[i] === "string")
                            $util.base64.decode(object.stringVal[i], message.stringVal[i] = $util.newBuffer($util.base64.length(object.stringVal[i])), 0);
                        else if (object.stringVal[i].length)
                            message.stringVal[i] = object.stringVal[i];
                }
                if (object.scomplexVal) {
                    if (!Array.isArray(object.scomplexVal))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.scomplexVal: array expected");
                    message.scomplexVal = [];
                    for (var i = 0; i < object.scomplexVal.length; ++i)
                        message.scomplexVal[i] = Number(object.scomplexVal[i]);
                }
                if (object.int64Val) {
                    if (!Array.isArray(object.int64Val))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.int64Val: array expected");
                    message.int64Val = [];
                    for (var i = 0; i < object.int64Val.length; ++i)
                        if ($util.Long)
                            (message.int64Val[i] = $util.Long.fromValue(object.int64Val[i])).unsigned = false;
                        else if (typeof object.int64Val[i] === "string")
                            message.int64Val[i] = parseInt(object.int64Val[i], 10);
                        else if (typeof object.int64Val[i] === "number")
                            message.int64Val[i] = object.int64Val[i];
                        else if (typeof object.int64Val[i] === "object")
                            message.int64Val[i] = new $util.LongBits(object.int64Val[i].low >>> 0, object.int64Val[i].high >>> 0).toNumber();
                }
                if (object.boolVal) {
                    if (!Array.isArray(object.boolVal))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.boolVal: array expected");
                    message.boolVal = [];
                    for (var i = 0; i < object.boolVal.length; ++i)
                        message.boolVal[i] = Boolean(object.boolVal[i]);
                }
                if (object.dcomplexVal) {
                    if (!Array.isArray(object.dcomplexVal))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.dcomplexVal: array expected");
                    message.dcomplexVal = [];
                    for (var i = 0; i < object.dcomplexVal.length; ++i)
                        message.dcomplexVal[i] = Number(object.dcomplexVal[i]);
                }
                if (object.variantVal) {
                    if (!Array.isArray(object.variantVal))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.variantVal: array expected");
                    message.variantVal = [];
                    for (var i = 0; i < object.variantVal.length; ++i) {
                        if (typeof object.variantVal[i] !== "object")
                            throw TypeError(".hydrosphere.tensorflow.TensorProto.variantVal: object expected");
                        message.variantVal[i] = $root.hydrosphere.tensorflow.VariantTensorDataProto.fromObject(object.variantVal[i]);
                    }
                }
                if (object.uint32Val) {
                    if (!Array.isArray(object.uint32Val))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.uint32Val: array expected");
                    message.uint32Val = [];
                    for (var i = 0; i < object.uint32Val.length; ++i)
                        message.uint32Val[i] = object.uint32Val[i] >>> 0;
                }
                if (object.uint64Val) {
                    if (!Array.isArray(object.uint64Val))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.uint64Val: array expected");
                    message.uint64Val = [];
                    for (var i = 0; i < object.uint64Val.length; ++i)
                        if ($util.Long)
                            (message.uint64Val[i] = $util.Long.fromValue(object.uint64Val[i])).unsigned = true;
                        else if (typeof object.uint64Val[i] === "string")
                            message.uint64Val[i] = parseInt(object.uint64Val[i], 10);
                        else if (typeof object.uint64Val[i] === "number")
                            message.uint64Val[i] = object.uint64Val[i];
                        else if (typeof object.uint64Val[i] === "object")
                            message.uint64Val[i] = new $util.LongBits(object.uint64Val[i].low >>> 0, object.uint64Val[i].high >>> 0).toNumber(true);
                }
                if (object.mapVal) {
                    if (!Array.isArray(object.mapVal))
                        throw TypeError(".hydrosphere.tensorflow.TensorProto.mapVal: array expected");
                    message.mapVal = [];
                    for (var i = 0; i < object.mapVal.length; ++i) {
                        if (typeof object.mapVal[i] !== "object")
                            throw TypeError(".hydrosphere.tensorflow.TensorProto.mapVal: object expected");
                        message.mapVal[i] = $root.hydrosphere.tensorflow.MapTensorData.fromObject(object.mapVal[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a TensorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.tensorflow.TensorProto
             * @static
             * @param {hydrosphere.tensorflow.TensorProto} message TensorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TensorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.floatVal = [];
                    object.doubleVal = [];
                    object.intVal = [];
                    object.stringVal = [];
                    object.scomplexVal = [];
                    object.int64Val = [];
                    object.boolVal = [];
                    object.dcomplexVal = [];
                    object.halfVal = [];
                    object.variantVal = [];
                    object.uint32Val = [];
                    object.uint64Val = [];
                    object.mapVal = [];
                }
                if (options.defaults) {
                    object.dtype = options.enums === String ? "DT_INVALID" : 0;
                    object.tensorShape = null;
                    object.versionNumber = 0;
                    if (options.bytes === String)
                        object.tensorContent = "";
                    else {
                        object.tensorContent = [];
                        if (options.bytes !== Array)
                            object.tensorContent = $util.newBuffer(object.tensorContent);
                    }
                }
                if (message.dtype != null && message.hasOwnProperty("dtype"))
                    object.dtype = options.enums === String ? $root.hydrosphere.tensorflow.DataType[message.dtype] : message.dtype;
                if (message.tensorShape != null && message.hasOwnProperty("tensorShape"))
                    object.tensorShape = $root.hydrosphere.tensorflow.TensorShapeProto.toObject(message.tensorShape, options);
                if (message.versionNumber != null && message.hasOwnProperty("versionNumber"))
                    object.versionNumber = message.versionNumber;
                if (message.tensorContent != null && message.hasOwnProperty("tensorContent"))
                    object.tensorContent = options.bytes === String ? $util.base64.encode(message.tensorContent, 0, message.tensorContent.length) : options.bytes === Array ? Array.prototype.slice.call(message.tensorContent) : message.tensorContent;
                if (message.floatVal && message.floatVal.length) {
                    object.floatVal = [];
                    for (var j = 0; j < message.floatVal.length; ++j)
                        object.floatVal[j] = options.json && !isFinite(message.floatVal[j]) ? String(message.floatVal[j]) : message.floatVal[j];
                }
                if (message.doubleVal && message.doubleVal.length) {
                    object.doubleVal = [];
                    for (var j = 0; j < message.doubleVal.length; ++j)
                        object.doubleVal[j] = options.json && !isFinite(message.doubleVal[j]) ? String(message.doubleVal[j]) : message.doubleVal[j];
                }
                if (message.intVal && message.intVal.length) {
                    object.intVal = [];
                    for (var j = 0; j < message.intVal.length; ++j)
                        object.intVal[j] = message.intVal[j];
                }
                if (message.stringVal && message.stringVal.length) {
                    object.stringVal = [];
                    for (var j = 0; j < message.stringVal.length; ++j)
                        object.stringVal[j] = options.bytes === String ? $util.base64.encode(message.stringVal[j], 0, message.stringVal[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.stringVal[j]) : message.stringVal[j];
                }
                if (message.scomplexVal && message.scomplexVal.length) {
                    object.scomplexVal = [];
                    for (var j = 0; j < message.scomplexVal.length; ++j)
                        object.scomplexVal[j] = options.json && !isFinite(message.scomplexVal[j]) ? String(message.scomplexVal[j]) : message.scomplexVal[j];
                }
                if (message.int64Val && message.int64Val.length) {
                    object.int64Val = [];
                    for (var j = 0; j < message.int64Val.length; ++j)
                        if (typeof message.int64Val[j] === "number")
                            object.int64Val[j] = options.longs === String ? String(message.int64Val[j]) : message.int64Val[j];
                        else
                            object.int64Val[j] = options.longs === String ? $util.Long.prototype.toString.call(message.int64Val[j]) : options.longs === Number ? new $util.LongBits(message.int64Val[j].low >>> 0, message.int64Val[j].high >>> 0).toNumber() : message.int64Val[j];
                }
                if (message.boolVal && message.boolVal.length) {
                    object.boolVal = [];
                    for (var j = 0; j < message.boolVal.length; ++j)
                        object.boolVal[j] = message.boolVal[j];
                }
                if (message.dcomplexVal && message.dcomplexVal.length) {
                    object.dcomplexVal = [];
                    for (var j = 0; j < message.dcomplexVal.length; ++j)
                        object.dcomplexVal[j] = options.json && !isFinite(message.dcomplexVal[j]) ? String(message.dcomplexVal[j]) : message.dcomplexVal[j];
                }
                if (message.halfVal && message.halfVal.length) {
                    object.halfVal = [];
                    for (var j = 0; j < message.halfVal.length; ++j)
                        object.halfVal[j] = message.halfVal[j];
                }
                if (message.variantVal && message.variantVal.length) {
                    object.variantVal = [];
                    for (var j = 0; j < message.variantVal.length; ++j)
                        object.variantVal[j] = $root.hydrosphere.tensorflow.VariantTensorDataProto.toObject(message.variantVal[j], options);
                }
                if (message.uint32Val && message.uint32Val.length) {
                    object.uint32Val = [];
                    for (var j = 0; j < message.uint32Val.length; ++j)
                        object.uint32Val[j] = message.uint32Val[j];
                }
                if (message.uint64Val && message.uint64Val.length) {
                    object.uint64Val = [];
                    for (var j = 0; j < message.uint64Val.length; ++j)
                        if (typeof message.uint64Val[j] === "number")
                            object.uint64Val[j] = options.longs === String ? String(message.uint64Val[j]) : message.uint64Val[j];
                        else
                            object.uint64Val[j] = options.longs === String ? $util.Long.prototype.toString.call(message.uint64Val[j]) : options.longs === Number ? new $util.LongBits(message.uint64Val[j].low >>> 0, message.uint64Val[j].high >>> 0).toNumber(true) : message.uint64Val[j];
                }
                if (message.mapVal && message.mapVal.length) {
                    object.mapVal = [];
                    for (var j = 0; j < message.mapVal.length; ++j)
                        object.mapVal[j] = $root.hydrosphere.tensorflow.MapTensorData.toObject(message.mapVal[j], options);
                }
                return object;
            };

            /**
             * Converts this TensorProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.tensorflow.TensorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TensorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TensorProto;
        })();

        tensorflow.VariantTensorDataProto = (function() {

            /**
             * Properties of a VariantTensorDataProto.
             * @memberof hydrosphere.tensorflow
             * @interface IVariantTensorDataProto
             * @property {string|null} [typeName] VariantTensorDataProto typeName
             * @property {Uint8Array|null} [metadata] VariantTensorDataProto metadata
             * @property {Array.<hydrosphere.tensorflow.ITensorProto>|null} [tensors] VariantTensorDataProto tensors
             */

            /**
             * Constructs a new VariantTensorDataProto.
             * @memberof hydrosphere.tensorflow
             * @classdesc Represents a VariantTensorDataProto.
             * @implements IVariantTensorDataProto
             * @constructor
             * @param {hydrosphere.tensorflow.IVariantTensorDataProto=} [properties] Properties to set
             */
            function VariantTensorDataProto(properties) {
                this.tensors = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * VariantTensorDataProto typeName.
             * @member {string} typeName
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @instance
             */
            VariantTensorDataProto.prototype.typeName = "";

            /**
             * VariantTensorDataProto metadata.
             * @member {Uint8Array} metadata
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @instance
             */
            VariantTensorDataProto.prototype.metadata = $util.newBuffer([]);

            /**
             * VariantTensorDataProto tensors.
             * @member {Array.<hydrosphere.tensorflow.ITensorProto>} tensors
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @instance
             */
            VariantTensorDataProto.prototype.tensors = $util.emptyArray;

            /**
             * Creates a new VariantTensorDataProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @static
             * @param {hydrosphere.tensorflow.IVariantTensorDataProto=} [properties] Properties to set
             * @returns {hydrosphere.tensorflow.VariantTensorDataProto} VariantTensorDataProto instance
             */
            VariantTensorDataProto.create = function create(properties) {
                return new VariantTensorDataProto(properties);
            };

            /**
             * Encodes the specified VariantTensorDataProto message. Does not implicitly {@link hydrosphere.tensorflow.VariantTensorDataProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @static
             * @param {hydrosphere.tensorflow.IVariantTensorDataProto} message VariantTensorDataProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VariantTensorDataProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.typeName != null && message.hasOwnProperty("typeName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.typeName);
                if (message.metadata != null && message.hasOwnProperty("metadata"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.metadata);
                if (message.tensors != null && message.tensors.length)
                    for (var i = 0; i < message.tensors.length; ++i)
                        $root.hydrosphere.tensorflow.TensorProto.encode(message.tensors[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified VariantTensorDataProto message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.VariantTensorDataProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @static
             * @param {hydrosphere.tensorflow.IVariantTensorDataProto} message VariantTensorDataProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VariantTensorDataProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a VariantTensorDataProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.tensorflow.VariantTensorDataProto} VariantTensorDataProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VariantTensorDataProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.tensorflow.VariantTensorDataProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.typeName = reader.string();
                        break;
                    case 2:
                        message.metadata = reader.bytes();
                        break;
                    case 3:
                        if (!(message.tensors && message.tensors.length))
                            message.tensors = [];
                        message.tensors.push($root.hydrosphere.tensorflow.TensorProto.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a VariantTensorDataProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.tensorflow.VariantTensorDataProto} VariantTensorDataProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VariantTensorDataProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a VariantTensorDataProto message.
             * @function verify
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VariantTensorDataProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.typeName != null && message.hasOwnProperty("typeName"))
                    if (!$util.isString(message.typeName))
                        return "typeName: string expected";
                if (message.metadata != null && message.hasOwnProperty("metadata"))
                    if (!(message.metadata && typeof message.metadata.length === "number" || $util.isString(message.metadata)))
                        return "metadata: buffer expected";
                if (message.tensors != null && message.hasOwnProperty("tensors")) {
                    if (!Array.isArray(message.tensors))
                        return "tensors: array expected";
                    for (var i = 0; i < message.tensors.length; ++i) {
                        var error = $root.hydrosphere.tensorflow.TensorProto.verify(message.tensors[i]);
                        if (error)
                            return "tensors." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a VariantTensorDataProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.tensorflow.VariantTensorDataProto} VariantTensorDataProto
             */
            VariantTensorDataProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.tensorflow.VariantTensorDataProto)
                    return object;
                var message = new $root.hydrosphere.tensorflow.VariantTensorDataProto();
                if (object.typeName != null)
                    message.typeName = String(object.typeName);
                if (object.metadata != null)
                    if (typeof object.metadata === "string")
                        $util.base64.decode(object.metadata, message.metadata = $util.newBuffer($util.base64.length(object.metadata)), 0);
                    else if (object.metadata.length)
                        message.metadata = object.metadata;
                if (object.tensors) {
                    if (!Array.isArray(object.tensors))
                        throw TypeError(".hydrosphere.tensorflow.VariantTensorDataProto.tensors: array expected");
                    message.tensors = [];
                    for (var i = 0; i < object.tensors.length; ++i) {
                        if (typeof object.tensors[i] !== "object")
                            throw TypeError(".hydrosphere.tensorflow.VariantTensorDataProto.tensors: object expected");
                        message.tensors[i] = $root.hydrosphere.tensorflow.TensorProto.fromObject(object.tensors[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a VariantTensorDataProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @static
             * @param {hydrosphere.tensorflow.VariantTensorDataProto} message VariantTensorDataProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VariantTensorDataProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.tensors = [];
                if (options.defaults) {
                    object.typeName = "";
                    if (options.bytes === String)
                        object.metadata = "";
                    else {
                        object.metadata = [];
                        if (options.bytes !== Array)
                            object.metadata = $util.newBuffer(object.metadata);
                    }
                }
                if (message.typeName != null && message.hasOwnProperty("typeName"))
                    object.typeName = message.typeName;
                if (message.metadata != null && message.hasOwnProperty("metadata"))
                    object.metadata = options.bytes === String ? $util.base64.encode(message.metadata, 0, message.metadata.length) : options.bytes === Array ? Array.prototype.slice.call(message.metadata) : message.metadata;
                if (message.tensors && message.tensors.length) {
                    object.tensors = [];
                    for (var j = 0; j < message.tensors.length; ++j)
                        object.tensors[j] = $root.hydrosphere.tensorflow.TensorProto.toObject(message.tensors[j], options);
                }
                return object;
            };

            /**
             * Converts this VariantTensorDataProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.tensorflow.VariantTensorDataProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VariantTensorDataProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return VariantTensorDataProto;
        })();

        tensorflow.MapTensorData = (function() {

            /**
             * Properties of a MapTensorData.
             * @memberof hydrosphere.tensorflow
             * @interface IMapTensorData
             * @property {Object.<string,hydrosphere.tensorflow.ITensorProto>|null} [subtensors] MapTensorData subtensors
             */

            /**
             * Constructs a new MapTensorData.
             * @memberof hydrosphere.tensorflow
             * @classdesc Represents a MapTensorData.
             * @implements IMapTensorData
             * @constructor
             * @param {hydrosphere.tensorflow.IMapTensorData=} [properties] Properties to set
             */
            function MapTensorData(properties) {
                this.subtensors = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MapTensorData subtensors.
             * @member {Object.<string,hydrosphere.tensorflow.ITensorProto>} subtensors
             * @memberof hydrosphere.tensorflow.MapTensorData
             * @instance
             */
            MapTensorData.prototype.subtensors = $util.emptyObject;

            /**
             * Creates a new MapTensorData instance using the specified properties.
             * @function create
             * @memberof hydrosphere.tensorflow.MapTensorData
             * @static
             * @param {hydrosphere.tensorflow.IMapTensorData=} [properties] Properties to set
             * @returns {hydrosphere.tensorflow.MapTensorData} MapTensorData instance
             */
            MapTensorData.create = function create(properties) {
                return new MapTensorData(properties);
            };

            /**
             * Encodes the specified MapTensorData message. Does not implicitly {@link hydrosphere.tensorflow.MapTensorData.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.tensorflow.MapTensorData
             * @static
             * @param {hydrosphere.tensorflow.IMapTensorData} message MapTensorData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MapTensorData.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.subtensors != null && message.hasOwnProperty("subtensors"))
                    for (var keys = Object.keys(message.subtensors), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.hydrosphere.tensorflow.TensorProto.encode(message.subtensors[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified MapTensorData message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.MapTensorData.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.tensorflow.MapTensorData
             * @static
             * @param {hydrosphere.tensorflow.IMapTensorData} message MapTensorData message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MapTensorData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MapTensorData message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.tensorflow.MapTensorData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.tensorflow.MapTensorData} MapTensorData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MapTensorData.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.tensorflow.MapTensorData(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.subtensors === $util.emptyObject)
                            message.subtensors = {};
                        key = reader.string();
                        reader.pos++;
                        message.subtensors[key] = $root.hydrosphere.tensorflow.TensorProto.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MapTensorData message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.tensorflow.MapTensorData
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.tensorflow.MapTensorData} MapTensorData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MapTensorData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MapTensorData message.
             * @function verify
             * @memberof hydrosphere.tensorflow.MapTensorData
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MapTensorData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.subtensors != null && message.hasOwnProperty("subtensors")) {
                    if (!$util.isObject(message.subtensors))
                        return "subtensors: object expected";
                    var key = Object.keys(message.subtensors);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.hydrosphere.tensorflow.TensorProto.verify(message.subtensors[key[i]]);
                        if (error)
                            return "subtensors." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a MapTensorData message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.tensorflow.MapTensorData
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.tensorflow.MapTensorData} MapTensorData
             */
            MapTensorData.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.tensorflow.MapTensorData)
                    return object;
                var message = new $root.hydrosphere.tensorflow.MapTensorData();
                if (object.subtensors) {
                    if (typeof object.subtensors !== "object")
                        throw TypeError(".hydrosphere.tensorflow.MapTensorData.subtensors: object expected");
                    message.subtensors = {};
                    for (var keys = Object.keys(object.subtensors), i = 0; i < keys.length; ++i) {
                        if (typeof object.subtensors[keys[i]] !== "object")
                            throw TypeError(".hydrosphere.tensorflow.MapTensorData.subtensors: object expected");
                        message.subtensors[keys[i]] = $root.hydrosphere.tensorflow.TensorProto.fromObject(object.subtensors[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a MapTensorData message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.tensorflow.MapTensorData
             * @static
             * @param {hydrosphere.tensorflow.MapTensorData} message MapTensorData
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MapTensorData.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.subtensors = {};
                var keys2;
                if (message.subtensors && (keys2 = Object.keys(message.subtensors)).length) {
                    object.subtensors = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.subtensors[keys2[j]] = $root.hydrosphere.tensorflow.TensorProto.toObject(message.subtensors[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this MapTensorData to JSON.
             * @function toJSON
             * @memberof hydrosphere.tensorflow.MapTensorData
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MapTensorData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MapTensorData;
        })();

        /**
         * DataType enum.
         * @name hydrosphere.tensorflow.DataType
         * @enum {string}
         * @property {number} DT_INVALID=0 DT_INVALID value
         * @property {number} DT_FLOAT=1 DT_FLOAT value
         * @property {number} DT_DOUBLE=2 DT_DOUBLE value
         * @property {number} DT_INT32=3 DT_INT32 value
         * @property {number} DT_UINT8=4 DT_UINT8 value
         * @property {number} DT_INT16=5 DT_INT16 value
         * @property {number} DT_INT8=6 DT_INT8 value
         * @property {number} DT_STRING=7 DT_STRING value
         * @property {number} DT_COMPLEX64=8 DT_COMPLEX64 value
         * @property {number} DT_INT64=9 DT_INT64 value
         * @property {number} DT_BOOL=10 DT_BOOL value
         * @property {number} DT_QINT8=11 DT_QINT8 value
         * @property {number} DT_QUINT8=12 DT_QUINT8 value
         * @property {number} DT_QINT32=13 DT_QINT32 value
         * @property {number} DT_BFLOAT16=14 DT_BFLOAT16 value
         * @property {number} DT_QINT16=15 DT_QINT16 value
         * @property {number} DT_QUINT16=16 DT_QUINT16 value
         * @property {number} DT_UINT16=17 DT_UINT16 value
         * @property {number} DT_COMPLEX128=18 DT_COMPLEX128 value
         * @property {number} DT_HALF=19 DT_HALF value
         * @property {number} DT_RESOURCE=20 DT_RESOURCE value
         * @property {number} DT_VARIANT=21 DT_VARIANT value
         * @property {number} DT_UINT32=22 DT_UINT32 value
         * @property {number} DT_UINT64=23 DT_UINT64 value
         * @property {number} DT_MAP=27 DT_MAP value
         */
        tensorflow.DataType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "DT_INVALID"] = 0;
            values[valuesById[1] = "DT_FLOAT"] = 1;
            values[valuesById[2] = "DT_DOUBLE"] = 2;
            values[valuesById[3] = "DT_INT32"] = 3;
            values[valuesById[4] = "DT_UINT8"] = 4;
            values[valuesById[5] = "DT_INT16"] = 5;
            values[valuesById[6] = "DT_INT8"] = 6;
            values[valuesById[7] = "DT_STRING"] = 7;
            values[valuesById[8] = "DT_COMPLEX64"] = 8;
            values[valuesById[9] = "DT_INT64"] = 9;
            values[valuesById[10] = "DT_BOOL"] = 10;
            values[valuesById[11] = "DT_QINT8"] = 11;
            values[valuesById[12] = "DT_QUINT8"] = 12;
            values[valuesById[13] = "DT_QINT32"] = 13;
            values[valuesById[14] = "DT_BFLOAT16"] = 14;
            values[valuesById[15] = "DT_QINT16"] = 15;
            values[valuesById[16] = "DT_QUINT16"] = 16;
            values[valuesById[17] = "DT_UINT16"] = 17;
            values[valuesById[18] = "DT_COMPLEX128"] = 18;
            values[valuesById[19] = "DT_HALF"] = 19;
            values[valuesById[20] = "DT_RESOURCE"] = 20;
            values[valuesById[21] = "DT_VARIANT"] = 21;
            values[valuesById[22] = "DT_UINT32"] = 22;
            values[valuesById[23] = "DT_UINT64"] = 23;
            values[valuesById[27] = "DT_MAP"] = 27;
            return values;
        })();

        tensorflow.TensorShapeProto = (function() {

            /**
             * Properties of a TensorShapeProto.
             * @memberof hydrosphere.tensorflow
             * @interface ITensorShapeProto
             * @property {Array.<hydrosphere.tensorflow.TensorShapeProto.IDim>|null} [dim] TensorShapeProto dim
             * @property {boolean|null} [unknownRank] TensorShapeProto unknownRank
             */

            /**
             * Constructs a new TensorShapeProto.
             * @memberof hydrosphere.tensorflow
             * @classdesc Represents a TensorShapeProto.
             * @implements ITensorShapeProto
             * @constructor
             * @param {hydrosphere.tensorflow.ITensorShapeProto=} [properties] Properties to set
             */
            function TensorShapeProto(properties) {
                this.dim = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TensorShapeProto dim.
             * @member {Array.<hydrosphere.tensorflow.TensorShapeProto.IDim>} dim
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @instance
             */
            TensorShapeProto.prototype.dim = $util.emptyArray;

            /**
             * TensorShapeProto unknownRank.
             * @member {boolean} unknownRank
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @instance
             */
            TensorShapeProto.prototype.unknownRank = false;

            /**
             * Creates a new TensorShapeProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @static
             * @param {hydrosphere.tensorflow.ITensorShapeProto=} [properties] Properties to set
             * @returns {hydrosphere.tensorflow.TensorShapeProto} TensorShapeProto instance
             */
            TensorShapeProto.create = function create(properties) {
                return new TensorShapeProto(properties);
            };

            /**
             * Encodes the specified TensorShapeProto message. Does not implicitly {@link hydrosphere.tensorflow.TensorShapeProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @static
             * @param {hydrosphere.tensorflow.ITensorShapeProto} message TensorShapeProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TensorShapeProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.dim != null && message.dim.length)
                    for (var i = 0; i < message.dim.length; ++i)
                        $root.hydrosphere.tensorflow.TensorShapeProto.Dim.encode(message.dim[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.unknownRank != null && message.hasOwnProperty("unknownRank"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.unknownRank);
                return writer;
            };

            /**
             * Encodes the specified TensorShapeProto message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.TensorShapeProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @static
             * @param {hydrosphere.tensorflow.ITensorShapeProto} message TensorShapeProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TensorShapeProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TensorShapeProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.tensorflow.TensorShapeProto} TensorShapeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorShapeProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.tensorflow.TensorShapeProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        if (!(message.dim && message.dim.length))
                            message.dim = [];
                        message.dim.push($root.hydrosphere.tensorflow.TensorShapeProto.Dim.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.unknownRank = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TensorShapeProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.tensorflow.TensorShapeProto} TensorShapeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorShapeProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TensorShapeProto message.
             * @function verify
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TensorShapeProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.dim != null && message.hasOwnProperty("dim")) {
                    if (!Array.isArray(message.dim))
                        return "dim: array expected";
                    for (var i = 0; i < message.dim.length; ++i) {
                        var error = $root.hydrosphere.tensorflow.TensorShapeProto.Dim.verify(message.dim[i]);
                        if (error)
                            return "dim." + error;
                    }
                }
                if (message.unknownRank != null && message.hasOwnProperty("unknownRank"))
                    if (typeof message.unknownRank !== "boolean")
                        return "unknownRank: boolean expected";
                return null;
            };

            /**
             * Creates a TensorShapeProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.tensorflow.TensorShapeProto} TensorShapeProto
             */
            TensorShapeProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.tensorflow.TensorShapeProto)
                    return object;
                var message = new $root.hydrosphere.tensorflow.TensorShapeProto();
                if (object.dim) {
                    if (!Array.isArray(object.dim))
                        throw TypeError(".hydrosphere.tensorflow.TensorShapeProto.dim: array expected");
                    message.dim = [];
                    for (var i = 0; i < object.dim.length; ++i) {
                        if (typeof object.dim[i] !== "object")
                            throw TypeError(".hydrosphere.tensorflow.TensorShapeProto.dim: object expected");
                        message.dim[i] = $root.hydrosphere.tensorflow.TensorShapeProto.Dim.fromObject(object.dim[i]);
                    }
                }
                if (object.unknownRank != null)
                    message.unknownRank = Boolean(object.unknownRank);
                return message;
            };

            /**
             * Creates a plain object from a TensorShapeProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @static
             * @param {hydrosphere.tensorflow.TensorShapeProto} message TensorShapeProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TensorShapeProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.dim = [];
                if (options.defaults)
                    object.unknownRank = false;
                if (message.dim && message.dim.length) {
                    object.dim = [];
                    for (var j = 0; j < message.dim.length; ++j)
                        object.dim[j] = $root.hydrosphere.tensorflow.TensorShapeProto.Dim.toObject(message.dim[j], options);
                }
                if (message.unknownRank != null && message.hasOwnProperty("unknownRank"))
                    object.unknownRank = message.unknownRank;
                return object;
            };

            /**
             * Converts this TensorShapeProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.tensorflow.TensorShapeProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TensorShapeProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            TensorShapeProto.Dim = (function() {

                /**
                 * Properties of a Dim.
                 * @memberof hydrosphere.tensorflow.TensorShapeProto
                 * @interface IDim
                 * @property {number|Long|null} [size] Dim size
                 * @property {string|null} [name] Dim name
                 */

                /**
                 * Constructs a new Dim.
                 * @memberof hydrosphere.tensorflow.TensorShapeProto
                 * @classdesc Represents a Dim.
                 * @implements IDim
                 * @constructor
                 * @param {hydrosphere.tensorflow.TensorShapeProto.IDim=} [properties] Properties to set
                 */
                function Dim(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Dim size.
                 * @member {number|Long} size
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @instance
                 */
                Dim.prototype.size = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Dim name.
                 * @member {string} name
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @instance
                 */
                Dim.prototype.name = "";

                /**
                 * Creates a new Dim instance using the specified properties.
                 * @function create
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {hydrosphere.tensorflow.TensorShapeProto.IDim=} [properties] Properties to set
                 * @returns {hydrosphere.tensorflow.TensorShapeProto.Dim} Dim instance
                 */
                Dim.create = function create(properties) {
                    return new Dim(properties);
                };

                /**
                 * Encodes the specified Dim message. Does not implicitly {@link hydrosphere.tensorflow.TensorShapeProto.Dim.verify|verify} messages.
                 * @function encode
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {hydrosphere.tensorflow.TensorShapeProto.IDim} message Dim message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Dim.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.size != null && message.hasOwnProperty("size"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.size);
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                    return writer;
                };

                /**
                 * Encodes the specified Dim message, length delimited. Does not implicitly {@link hydrosphere.tensorflow.TensorShapeProto.Dim.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {hydrosphere.tensorflow.TensorShapeProto.IDim} message Dim message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Dim.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Dim message from the specified reader or buffer.
                 * @function decode
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hydrosphere.tensorflow.TensorShapeProto.Dim} Dim
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Dim.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.tensorflow.TensorShapeProto.Dim();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.size = reader.int64();
                            break;
                        case 2:
                            message.name = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Dim message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hydrosphere.tensorflow.TensorShapeProto.Dim} Dim
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Dim.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Dim message.
                 * @function verify
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Dim.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.size != null && message.hasOwnProperty("size"))
                        if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                            return "size: integer|Long expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    return null;
                };

                /**
                 * Creates a Dim message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hydrosphere.tensorflow.TensorShapeProto.Dim} Dim
                 */
                Dim.fromObject = function fromObject(object) {
                    if (object instanceof $root.hydrosphere.tensorflow.TensorShapeProto.Dim)
                        return object;
                    var message = new $root.hydrosphere.tensorflow.TensorShapeProto.Dim();
                    if (object.size != null)
                        if ($util.Long)
                            (message.size = $util.Long.fromValue(object.size)).unsigned = false;
                        else if (typeof object.size === "string")
                            message.size = parseInt(object.size, 10);
                        else if (typeof object.size === "number")
                            message.size = object.size;
                        else if (typeof object.size === "object")
                            message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber();
                    if (object.name != null)
                        message.name = String(object.name);
                    return message;
                };

                /**
                 * Creates a plain object from a Dim message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @static
                 * @param {hydrosphere.tensorflow.TensorShapeProto.Dim} message Dim
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Dim.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.size = options.longs === String ? "0" : 0;
                        object.name = "";
                    }
                    if (message.size != null && message.hasOwnProperty("size"))
                        if (typeof message.size === "number")
                            object.size = options.longs === String ? String(message.size) : message.size;
                        else
                            object.size = options.longs === String ? $util.Long.prototype.toString.call(message.size) : options.longs === Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber() : message.size;
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    return object;
                };

                /**
                 * Converts this Dim to JSON.
                 * @function toJSON
                 * @memberof hydrosphere.tensorflow.TensorShapeProto.Dim
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Dim.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Dim;
            })();

            return TensorShapeProto;
        })();

        return tensorflow;
    })();

    hydrosphere.contract = (function() {

        /**
         * Namespace contract.
         * @memberof hydrosphere
         * @namespace
         */
        var contract = {};

        contract.ModelField = (function() {

            /**
             * Properties of a ModelField.
             * @memberof hydrosphere.contract
             * @interface IModelField
             * @property {string|null} [name] ModelField name
             * @property {hydrosphere.tensorflow.ITensorShapeProto|null} [shape] ModelField shape
             * @property {hydrosphere.contract.ModelField.ISubfield|null} [subfields] ModelField subfields
             * @property {hydrosphere.tensorflow.DataType|null} [dtype] ModelField dtype
             */

            /**
             * Constructs a new ModelField.
             * @memberof hydrosphere.contract
             * @classdesc Represents a ModelField.
             * @implements IModelField
             * @constructor
             * @param {hydrosphere.contract.IModelField=} [properties] Properties to set
             */
            function ModelField(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ModelField name.
             * @member {string} name
             * @memberof hydrosphere.contract.ModelField
             * @instance
             */
            ModelField.prototype.name = "";

            /**
             * ModelField shape.
             * @member {hydrosphere.tensorflow.ITensorShapeProto|null|undefined} shape
             * @memberof hydrosphere.contract.ModelField
             * @instance
             */
            ModelField.prototype.shape = null;

            /**
             * ModelField subfields.
             * @member {hydrosphere.contract.ModelField.ISubfield|null|undefined} subfields
             * @memberof hydrosphere.contract.ModelField
             * @instance
             */
            ModelField.prototype.subfields = null;

            /**
             * ModelField dtype.
             * @member {hydrosphere.tensorflow.DataType} dtype
             * @memberof hydrosphere.contract.ModelField
             * @instance
             */
            ModelField.prototype.dtype = 0;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * ModelField typeOrSubfields.
             * @member {"subfields"|"dtype"|undefined} typeOrSubfields
             * @memberof hydrosphere.contract.ModelField
             * @instance
             */
            Object.defineProperty(ModelField.prototype, "typeOrSubfields", {
                get: $util.oneOfGetter($oneOfFields = ["subfields", "dtype"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ModelField instance using the specified properties.
             * @function create
             * @memberof hydrosphere.contract.ModelField
             * @static
             * @param {hydrosphere.contract.IModelField=} [properties] Properties to set
             * @returns {hydrosphere.contract.ModelField} ModelField instance
             */
            ModelField.create = function create(properties) {
                return new ModelField(properties);
            };

            /**
             * Encodes the specified ModelField message. Does not implicitly {@link hydrosphere.contract.ModelField.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.contract.ModelField
             * @static
             * @param {hydrosphere.contract.IModelField} message ModelField message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelField.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.shape != null && message.hasOwnProperty("shape"))
                    $root.hydrosphere.tensorflow.TensorShapeProto.encode(message.shape, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.subfields != null && message.hasOwnProperty("subfields"))
                    $root.hydrosphere.contract.ModelField.Subfield.encode(message.subfields, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.dtype != null && message.hasOwnProperty("dtype"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.dtype);
                return writer;
            };

            /**
             * Encodes the specified ModelField message, length delimited. Does not implicitly {@link hydrosphere.contract.ModelField.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.contract.ModelField
             * @static
             * @param {hydrosphere.contract.IModelField} message ModelField message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelField.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ModelField message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.contract.ModelField
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.contract.ModelField} ModelField
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelField.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.contract.ModelField();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.shape = $root.hydrosphere.tensorflow.TensorShapeProto.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.subfields = $root.hydrosphere.contract.ModelField.Subfield.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.dtype = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ModelField message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.contract.ModelField
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.contract.ModelField} ModelField
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelField.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ModelField message.
             * @function verify
             * @memberof hydrosphere.contract.ModelField
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ModelField.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.shape != null && message.hasOwnProperty("shape")) {
                    var error = $root.hydrosphere.tensorflow.TensorShapeProto.verify(message.shape);
                    if (error)
                        return "shape." + error;
                }
                if (message.subfields != null && message.hasOwnProperty("subfields")) {
                    properties.typeOrSubfields = 1;
                    {
                        var error = $root.hydrosphere.contract.ModelField.Subfield.verify(message.subfields);
                        if (error)
                            return "subfields." + error;
                    }
                }
                if (message.dtype != null && message.hasOwnProperty("dtype")) {
                    if (properties.typeOrSubfields === 1)
                        return "typeOrSubfields: multiple values";
                    properties.typeOrSubfields = 1;
                    switch (message.dtype) {
                    default:
                        return "dtype: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 27:
                        break;
                    }
                }
                return null;
            };

            /**
             * Creates a ModelField message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.contract.ModelField
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.contract.ModelField} ModelField
             */
            ModelField.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.contract.ModelField)
                    return object;
                var message = new $root.hydrosphere.contract.ModelField();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.shape != null) {
                    if (typeof object.shape !== "object")
                        throw TypeError(".hydrosphere.contract.ModelField.shape: object expected");
                    message.shape = $root.hydrosphere.tensorflow.TensorShapeProto.fromObject(object.shape);
                }
                if (object.subfields != null) {
                    if (typeof object.subfields !== "object")
                        throw TypeError(".hydrosphere.contract.ModelField.subfields: object expected");
                    message.subfields = $root.hydrosphere.contract.ModelField.Subfield.fromObject(object.subfields);
                }
                switch (object.dtype) {
                case "DT_INVALID":
                case 0:
                    message.dtype = 0;
                    break;
                case "DT_FLOAT":
                case 1:
                    message.dtype = 1;
                    break;
                case "DT_DOUBLE":
                case 2:
                    message.dtype = 2;
                    break;
                case "DT_INT32":
                case 3:
                    message.dtype = 3;
                    break;
                case "DT_UINT8":
                case 4:
                    message.dtype = 4;
                    break;
                case "DT_INT16":
                case 5:
                    message.dtype = 5;
                    break;
                case "DT_INT8":
                case 6:
                    message.dtype = 6;
                    break;
                case "DT_STRING":
                case 7:
                    message.dtype = 7;
                    break;
                case "DT_COMPLEX64":
                case 8:
                    message.dtype = 8;
                    break;
                case "DT_INT64":
                case 9:
                    message.dtype = 9;
                    break;
                case "DT_BOOL":
                case 10:
                    message.dtype = 10;
                    break;
                case "DT_QINT8":
                case 11:
                    message.dtype = 11;
                    break;
                case "DT_QUINT8":
                case 12:
                    message.dtype = 12;
                    break;
                case "DT_QINT32":
                case 13:
                    message.dtype = 13;
                    break;
                case "DT_BFLOAT16":
                case 14:
                    message.dtype = 14;
                    break;
                case "DT_QINT16":
                case 15:
                    message.dtype = 15;
                    break;
                case "DT_QUINT16":
                case 16:
                    message.dtype = 16;
                    break;
                case "DT_UINT16":
                case 17:
                    message.dtype = 17;
                    break;
                case "DT_COMPLEX128":
                case 18:
                    message.dtype = 18;
                    break;
                case "DT_HALF":
                case 19:
                    message.dtype = 19;
                    break;
                case "DT_RESOURCE":
                case 20:
                    message.dtype = 20;
                    break;
                case "DT_VARIANT":
                case 21:
                    message.dtype = 21;
                    break;
                case "DT_UINT32":
                case 22:
                    message.dtype = 22;
                    break;
                case "DT_UINT64":
                case 23:
                    message.dtype = 23;
                    break;
                case "DT_MAP":
                case 27:
                    message.dtype = 27;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a ModelField message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.contract.ModelField
             * @static
             * @param {hydrosphere.contract.ModelField} message ModelField
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ModelField.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.shape = null;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.shape != null && message.hasOwnProperty("shape"))
                    object.shape = $root.hydrosphere.tensorflow.TensorShapeProto.toObject(message.shape, options);
                if (message.subfields != null && message.hasOwnProperty("subfields")) {
                    object.subfields = $root.hydrosphere.contract.ModelField.Subfield.toObject(message.subfields, options);
                    if (options.oneofs)
                        object.typeOrSubfields = "subfields";
                }
                if (message.dtype != null && message.hasOwnProperty("dtype")) {
                    object.dtype = options.enums === String ? $root.hydrosphere.tensorflow.DataType[message.dtype] : message.dtype;
                    if (options.oneofs)
                        object.typeOrSubfields = "dtype";
                }
                return object;
            };

            /**
             * Converts this ModelField to JSON.
             * @function toJSON
             * @memberof hydrosphere.contract.ModelField
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ModelField.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            ModelField.Subfield = (function() {

                /**
                 * Properties of a Subfield.
                 * @memberof hydrosphere.contract.ModelField
                 * @interface ISubfield
                 * @property {Array.<hydrosphere.contract.IModelField>|null} [data] Subfield data
                 */

                /**
                 * Constructs a new Subfield.
                 * @memberof hydrosphere.contract.ModelField
                 * @classdesc Represents a Subfield.
                 * @implements ISubfield
                 * @constructor
                 * @param {hydrosphere.contract.ModelField.ISubfield=} [properties] Properties to set
                 */
                function Subfield(properties) {
                    this.data = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Subfield data.
                 * @member {Array.<hydrosphere.contract.IModelField>} data
                 * @memberof hydrosphere.contract.ModelField.Subfield
                 * @instance
                 */
                Subfield.prototype.data = $util.emptyArray;

                /**
                 * Creates a new Subfield instance using the specified properties.
                 * @function create
                 * @memberof hydrosphere.contract.ModelField.Subfield
                 * @static
                 * @param {hydrosphere.contract.ModelField.ISubfield=} [properties] Properties to set
                 * @returns {hydrosphere.contract.ModelField.Subfield} Subfield instance
                 */
                Subfield.create = function create(properties) {
                    return new Subfield(properties);
                };

                /**
                 * Encodes the specified Subfield message. Does not implicitly {@link hydrosphere.contract.ModelField.Subfield.verify|verify} messages.
                 * @function encode
                 * @memberof hydrosphere.contract.ModelField.Subfield
                 * @static
                 * @param {hydrosphere.contract.ModelField.ISubfield} message Subfield message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Subfield.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.data != null && message.data.length)
                        for (var i = 0; i < message.data.length; ++i)
                            $root.hydrosphere.contract.ModelField.encode(message.data[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Subfield message, length delimited. Does not implicitly {@link hydrosphere.contract.ModelField.Subfield.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hydrosphere.contract.ModelField.Subfield
                 * @static
                 * @param {hydrosphere.contract.ModelField.ISubfield} message Subfield message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Subfield.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Subfield message from the specified reader or buffer.
                 * @function decode
                 * @memberof hydrosphere.contract.ModelField.Subfield
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hydrosphere.contract.ModelField.Subfield} Subfield
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Subfield.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.contract.ModelField.Subfield();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            if (!(message.data && message.data.length))
                                message.data = [];
                            message.data.push($root.hydrosphere.contract.ModelField.decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Subfield message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hydrosphere.contract.ModelField.Subfield
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hydrosphere.contract.ModelField.Subfield} Subfield
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Subfield.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Subfield message.
                 * @function verify
                 * @memberof hydrosphere.contract.ModelField.Subfield
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Subfield.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.data != null && message.hasOwnProperty("data")) {
                        if (!Array.isArray(message.data))
                            return "data: array expected";
                        for (var i = 0; i < message.data.length; ++i) {
                            var error = $root.hydrosphere.contract.ModelField.verify(message.data[i]);
                            if (error)
                                return "data." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Subfield message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hydrosphere.contract.ModelField.Subfield
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hydrosphere.contract.ModelField.Subfield} Subfield
                 */
                Subfield.fromObject = function fromObject(object) {
                    if (object instanceof $root.hydrosphere.contract.ModelField.Subfield)
                        return object;
                    var message = new $root.hydrosphere.contract.ModelField.Subfield();
                    if (object.data) {
                        if (!Array.isArray(object.data))
                            throw TypeError(".hydrosphere.contract.ModelField.Subfield.data: array expected");
                        message.data = [];
                        for (var i = 0; i < object.data.length; ++i) {
                            if (typeof object.data[i] !== "object")
                                throw TypeError(".hydrosphere.contract.ModelField.Subfield.data: object expected");
                            message.data[i] = $root.hydrosphere.contract.ModelField.fromObject(object.data[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Subfield message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hydrosphere.contract.ModelField.Subfield
                 * @static
                 * @param {hydrosphere.contract.ModelField.Subfield} message Subfield
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Subfield.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.data = [];
                    if (message.data && message.data.length) {
                        object.data = [];
                        for (var j = 0; j < message.data.length; ++j)
                            object.data[j] = $root.hydrosphere.contract.ModelField.toObject(message.data[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this Subfield to JSON.
                 * @function toJSON
                 * @memberof hydrosphere.contract.ModelField.Subfield
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Subfield.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Subfield;
            })();

            return ModelField;
        })();

        contract.ModelContract = (function() {

            /**
             * Properties of a ModelContract.
             * @memberof hydrosphere.contract
             * @interface IModelContract
             * @property {string|null} [modelName] ModelContract modelName
             * @property {Array.<hydrosphere.contract.IModelSignature>|null} [signatures] ModelContract signatures
             */

            /**
             * Constructs a new ModelContract.
             * @memberof hydrosphere.contract
             * @classdesc Represents a ModelContract.
             * @implements IModelContract
             * @constructor
             * @param {hydrosphere.contract.IModelContract=} [properties] Properties to set
             */
            function ModelContract(properties) {
                this.signatures = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ModelContract modelName.
             * @member {string} modelName
             * @memberof hydrosphere.contract.ModelContract
             * @instance
             */
            ModelContract.prototype.modelName = "";

            /**
             * ModelContract signatures.
             * @member {Array.<hydrosphere.contract.IModelSignature>} signatures
             * @memberof hydrosphere.contract.ModelContract
             * @instance
             */
            ModelContract.prototype.signatures = $util.emptyArray;

            /**
             * Creates a new ModelContract instance using the specified properties.
             * @function create
             * @memberof hydrosphere.contract.ModelContract
             * @static
             * @param {hydrosphere.contract.IModelContract=} [properties] Properties to set
             * @returns {hydrosphere.contract.ModelContract} ModelContract instance
             */
            ModelContract.create = function create(properties) {
                return new ModelContract(properties);
            };

            /**
             * Encodes the specified ModelContract message. Does not implicitly {@link hydrosphere.contract.ModelContract.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.contract.ModelContract
             * @static
             * @param {hydrosphere.contract.IModelContract} message ModelContract message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelContract.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.modelName != null && message.hasOwnProperty("modelName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.modelName);
                if (message.signatures != null && message.signatures.length)
                    for (var i = 0; i < message.signatures.length; ++i)
                        $root.hydrosphere.contract.ModelSignature.encode(message.signatures[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ModelContract message, length delimited. Does not implicitly {@link hydrosphere.contract.ModelContract.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.contract.ModelContract
             * @static
             * @param {hydrosphere.contract.IModelContract} message ModelContract message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelContract.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ModelContract message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.contract.ModelContract
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.contract.ModelContract} ModelContract
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelContract.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.contract.ModelContract();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.modelName = reader.string();
                        break;
                    case 2:
                        if (!(message.signatures && message.signatures.length))
                            message.signatures = [];
                        message.signatures.push($root.hydrosphere.contract.ModelSignature.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ModelContract message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.contract.ModelContract
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.contract.ModelContract} ModelContract
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelContract.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ModelContract message.
             * @function verify
             * @memberof hydrosphere.contract.ModelContract
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ModelContract.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.modelName != null && message.hasOwnProperty("modelName"))
                    if (!$util.isString(message.modelName))
                        return "modelName: string expected";
                if (message.signatures != null && message.hasOwnProperty("signatures")) {
                    if (!Array.isArray(message.signatures))
                        return "signatures: array expected";
                    for (var i = 0; i < message.signatures.length; ++i) {
                        var error = $root.hydrosphere.contract.ModelSignature.verify(message.signatures[i]);
                        if (error)
                            return "signatures." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ModelContract message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.contract.ModelContract
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.contract.ModelContract} ModelContract
             */
            ModelContract.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.contract.ModelContract)
                    return object;
                var message = new $root.hydrosphere.contract.ModelContract();
                if (object.modelName != null)
                    message.modelName = String(object.modelName);
                if (object.signatures) {
                    if (!Array.isArray(object.signatures))
                        throw TypeError(".hydrosphere.contract.ModelContract.signatures: array expected");
                    message.signatures = [];
                    for (var i = 0; i < object.signatures.length; ++i) {
                        if (typeof object.signatures[i] !== "object")
                            throw TypeError(".hydrosphere.contract.ModelContract.signatures: object expected");
                        message.signatures[i] = $root.hydrosphere.contract.ModelSignature.fromObject(object.signatures[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a ModelContract message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.contract.ModelContract
             * @static
             * @param {hydrosphere.contract.ModelContract} message ModelContract
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ModelContract.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.signatures = [];
                if (options.defaults)
                    object.modelName = "";
                if (message.modelName != null && message.hasOwnProperty("modelName"))
                    object.modelName = message.modelName;
                if (message.signatures && message.signatures.length) {
                    object.signatures = [];
                    for (var j = 0; j < message.signatures.length; ++j)
                        object.signatures[j] = $root.hydrosphere.contract.ModelSignature.toObject(message.signatures[j], options);
                }
                return object;
            };

            /**
             * Converts this ModelContract to JSON.
             * @function toJSON
             * @memberof hydrosphere.contract.ModelContract
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ModelContract.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ModelContract;
        })();

        contract.ModelSignature = (function() {

            /**
             * Properties of a ModelSignature.
             * @memberof hydrosphere.contract
             * @interface IModelSignature
             * @property {string|null} [signatureName] ModelSignature signatureName
             * @property {Array.<hydrosphere.contract.IModelField>|null} [inputs] ModelSignature inputs
             * @property {Array.<hydrosphere.contract.IModelField>|null} [outputs] ModelSignature outputs
             */

            /**
             * Constructs a new ModelSignature.
             * @memberof hydrosphere.contract
             * @classdesc Represents a ModelSignature.
             * @implements IModelSignature
             * @constructor
             * @param {hydrosphere.contract.IModelSignature=} [properties] Properties to set
             */
            function ModelSignature(properties) {
                this.inputs = [];
                this.outputs = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ModelSignature signatureName.
             * @member {string} signatureName
             * @memberof hydrosphere.contract.ModelSignature
             * @instance
             */
            ModelSignature.prototype.signatureName = "";

            /**
             * ModelSignature inputs.
             * @member {Array.<hydrosphere.contract.IModelField>} inputs
             * @memberof hydrosphere.contract.ModelSignature
             * @instance
             */
            ModelSignature.prototype.inputs = $util.emptyArray;

            /**
             * ModelSignature outputs.
             * @member {Array.<hydrosphere.contract.IModelField>} outputs
             * @memberof hydrosphere.contract.ModelSignature
             * @instance
             */
            ModelSignature.prototype.outputs = $util.emptyArray;

            /**
             * Creates a new ModelSignature instance using the specified properties.
             * @function create
             * @memberof hydrosphere.contract.ModelSignature
             * @static
             * @param {hydrosphere.contract.IModelSignature=} [properties] Properties to set
             * @returns {hydrosphere.contract.ModelSignature} ModelSignature instance
             */
            ModelSignature.create = function create(properties) {
                return new ModelSignature(properties);
            };

            /**
             * Encodes the specified ModelSignature message. Does not implicitly {@link hydrosphere.contract.ModelSignature.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.contract.ModelSignature
             * @static
             * @param {hydrosphere.contract.IModelSignature} message ModelSignature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelSignature.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.signatureName != null && message.hasOwnProperty("signatureName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.signatureName);
                if (message.inputs != null && message.inputs.length)
                    for (var i = 0; i < message.inputs.length; ++i)
                        $root.hydrosphere.contract.ModelField.encode(message.inputs[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.outputs != null && message.outputs.length)
                    for (var i = 0; i < message.outputs.length; ++i)
                        $root.hydrosphere.contract.ModelField.encode(message.outputs[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ModelSignature message, length delimited. Does not implicitly {@link hydrosphere.contract.ModelSignature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.contract.ModelSignature
             * @static
             * @param {hydrosphere.contract.IModelSignature} message ModelSignature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelSignature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ModelSignature message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.contract.ModelSignature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.contract.ModelSignature} ModelSignature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelSignature.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.contract.ModelSignature();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.signatureName = reader.string();
                        break;
                    case 2:
                        if (!(message.inputs && message.inputs.length))
                            message.inputs = [];
                        message.inputs.push($root.hydrosphere.contract.ModelField.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        if (!(message.outputs && message.outputs.length))
                            message.outputs = [];
                        message.outputs.push($root.hydrosphere.contract.ModelField.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ModelSignature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.contract.ModelSignature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.contract.ModelSignature} ModelSignature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelSignature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ModelSignature message.
             * @function verify
             * @memberof hydrosphere.contract.ModelSignature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ModelSignature.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.signatureName != null && message.hasOwnProperty("signatureName"))
                    if (!$util.isString(message.signatureName))
                        return "signatureName: string expected";
                if (message.inputs != null && message.hasOwnProperty("inputs")) {
                    if (!Array.isArray(message.inputs))
                        return "inputs: array expected";
                    for (var i = 0; i < message.inputs.length; ++i) {
                        var error = $root.hydrosphere.contract.ModelField.verify(message.inputs[i]);
                        if (error)
                            return "inputs." + error;
                    }
                }
                if (message.outputs != null && message.hasOwnProperty("outputs")) {
                    if (!Array.isArray(message.outputs))
                        return "outputs: array expected";
                    for (var i = 0; i < message.outputs.length; ++i) {
                        var error = $root.hydrosphere.contract.ModelField.verify(message.outputs[i]);
                        if (error)
                            return "outputs." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ModelSignature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.contract.ModelSignature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.contract.ModelSignature} ModelSignature
             */
            ModelSignature.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.contract.ModelSignature)
                    return object;
                var message = new $root.hydrosphere.contract.ModelSignature();
                if (object.signatureName != null)
                    message.signatureName = String(object.signatureName);
                if (object.inputs) {
                    if (!Array.isArray(object.inputs))
                        throw TypeError(".hydrosphere.contract.ModelSignature.inputs: array expected");
                    message.inputs = [];
                    for (var i = 0; i < object.inputs.length; ++i) {
                        if (typeof object.inputs[i] !== "object")
                            throw TypeError(".hydrosphere.contract.ModelSignature.inputs: object expected");
                        message.inputs[i] = $root.hydrosphere.contract.ModelField.fromObject(object.inputs[i]);
                    }
                }
                if (object.outputs) {
                    if (!Array.isArray(object.outputs))
                        throw TypeError(".hydrosphere.contract.ModelSignature.outputs: array expected");
                    message.outputs = [];
                    for (var i = 0; i < object.outputs.length; ++i) {
                        if (typeof object.outputs[i] !== "object")
                            throw TypeError(".hydrosphere.contract.ModelSignature.outputs: object expected");
                        message.outputs[i] = $root.hydrosphere.contract.ModelField.fromObject(object.outputs[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a ModelSignature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.contract.ModelSignature
             * @static
             * @param {hydrosphere.contract.ModelSignature} message ModelSignature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ModelSignature.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.inputs = [];
                    object.outputs = [];
                }
                if (options.defaults)
                    object.signatureName = "";
                if (message.signatureName != null && message.hasOwnProperty("signatureName"))
                    object.signatureName = message.signatureName;
                if (message.inputs && message.inputs.length) {
                    object.inputs = [];
                    for (var j = 0; j < message.inputs.length; ++j)
                        object.inputs[j] = $root.hydrosphere.contract.ModelField.toObject(message.inputs[j], options);
                }
                if (message.outputs && message.outputs.length) {
                    object.outputs = [];
                    for (var j = 0; j < message.outputs.length; ++j)
                        object.outputs[j] = $root.hydrosphere.contract.ModelField.toObject(message.outputs[j], options);
                }
                return object;
            };

            /**
             * Converts this ModelSignature to JSON.
             * @function toJSON
             * @memberof hydrosphere.contract.ModelSignature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ModelSignature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ModelSignature;
        })();

        return contract;
    })();

    hydrosphere.onnx = (function() {

        /**
         * Namespace onnx.
         * @memberof hydrosphere
         * @namespace
         */
        var onnx = {};

        /**
         * Version enum.
         * @name hydrosphere.onnx.Version
         * @enum {string}
         * @property {number} _START_VERSION=0 _START_VERSION value
         * @property {number} IR_VERSION_2017_10_10=1 IR_VERSION_2017_10_10 value
         * @property {number} IR_VERSION_2017_10_30=2 IR_VERSION_2017_10_30 value
         * @property {number} IR_VERSION=3 IR_VERSION value
         */
        onnx.Version = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "_START_VERSION"] = 0;
            values[valuesById[1] = "IR_VERSION_2017_10_10"] = 1;
            values[valuesById[2] = "IR_VERSION_2017_10_30"] = 2;
            values[valuesById[3] = "IR_VERSION"] = 3;
            return values;
        })();

        onnx.AttributeProto = (function() {

            /**
             * Properties of an AttributeProto.
             * @memberof hydrosphere.onnx
             * @interface IAttributeProto
             * @property {string|null} [name] AttributeProto name
             * @property {string|null} [refAttrName] AttributeProto refAttrName
             * @property {string|null} [docString] AttributeProto docString
             * @property {hydrosphere.onnx.AttributeProto.AttributeType|null} [type] AttributeProto type
             * @property {number|null} [f] AttributeProto f
             * @property {number|Long|null} [i] AttributeProto i
             * @property {Uint8Array|null} [s] AttributeProto s
             * @property {hydrosphere.onnx.ITensorProto|null} [t] AttributeProto t
             * @property {hydrosphere.onnx.IGraphProto|null} [g] AttributeProto g
             * @property {Array.<number>|null} [floats] AttributeProto floats
             * @property {Array.<number|Long>|null} [ints] AttributeProto ints
             * @property {Array.<Uint8Array>|null} [strings] AttributeProto strings
             * @property {Array.<hydrosphere.onnx.ITensorProto>|null} [tensors] AttributeProto tensors
             * @property {Array.<hydrosphere.onnx.IGraphProto>|null} [graphs] AttributeProto graphs
             */

            /**
             * Constructs a new AttributeProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents an AttributeProto.
             * @implements IAttributeProto
             * @constructor
             * @param {hydrosphere.onnx.IAttributeProto=} [properties] Properties to set
             */
            function AttributeProto(properties) {
                this.floats = [];
                this.ints = [];
                this.strings = [];
                this.tensors = [];
                this.graphs = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AttributeProto name.
             * @member {string} name
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.name = "";

            /**
             * AttributeProto refAttrName.
             * @member {string} refAttrName
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.refAttrName = "";

            /**
             * AttributeProto docString.
             * @member {string} docString
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.docString = "";

            /**
             * AttributeProto type.
             * @member {hydrosphere.onnx.AttributeProto.AttributeType} type
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.type = 0;

            /**
             * AttributeProto f.
             * @member {number} f
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.f = 0;

            /**
             * AttributeProto i.
             * @member {number|Long} i
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.i = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * AttributeProto s.
             * @member {Uint8Array} s
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.s = $util.newBuffer([]);

            /**
             * AttributeProto t.
             * @member {hydrosphere.onnx.ITensorProto|null|undefined} t
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.t = null;

            /**
             * AttributeProto g.
             * @member {hydrosphere.onnx.IGraphProto|null|undefined} g
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.g = null;

            /**
             * AttributeProto floats.
             * @member {Array.<number>} floats
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.floats = $util.emptyArray;

            /**
             * AttributeProto ints.
             * @member {Array.<number|Long>} ints
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.ints = $util.emptyArray;

            /**
             * AttributeProto strings.
             * @member {Array.<Uint8Array>} strings
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.strings = $util.emptyArray;

            /**
             * AttributeProto tensors.
             * @member {Array.<hydrosphere.onnx.ITensorProto>} tensors
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.tensors = $util.emptyArray;

            /**
             * AttributeProto graphs.
             * @member {Array.<hydrosphere.onnx.IGraphProto>} graphs
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             */
            AttributeProto.prototype.graphs = $util.emptyArray;

            /**
             * Creates a new AttributeProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.AttributeProto
             * @static
             * @param {hydrosphere.onnx.IAttributeProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.AttributeProto} AttributeProto instance
             */
            AttributeProto.create = function create(properties) {
                return new AttributeProto(properties);
            };

            /**
             * Encodes the specified AttributeProto message. Does not implicitly {@link hydrosphere.onnx.AttributeProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.AttributeProto
             * @static
             * @param {hydrosphere.onnx.IAttributeProto} message AttributeProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AttributeProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.f != null && message.hasOwnProperty("f"))
                    writer.uint32(/* id 2, wireType 5 =*/21).float(message.f);
                if (message.i != null && message.hasOwnProperty("i"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.i);
                if (message.s != null && message.hasOwnProperty("s"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.s);
                if (message.t != null && message.hasOwnProperty("t"))
                    $root.hydrosphere.onnx.TensorProto.encode(message.t, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.g != null && message.hasOwnProperty("g"))
                    $root.hydrosphere.onnx.GraphProto.encode(message.g, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.floats != null && message.floats.length) {
                    writer.uint32(/* id 7, wireType 2 =*/58).fork();
                    for (var i = 0; i < message.floats.length; ++i)
                        writer.float(message.floats[i]);
                    writer.ldelim();
                }
                if (message.ints != null && message.ints.length) {
                    writer.uint32(/* id 8, wireType 2 =*/66).fork();
                    for (var i = 0; i < message.ints.length; ++i)
                        writer.int64(message.ints[i]);
                    writer.ldelim();
                }
                if (message.strings != null && message.strings.length)
                    for (var i = 0; i < message.strings.length; ++i)
                        writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.strings[i]);
                if (message.tensors != null && message.tensors.length)
                    for (var i = 0; i < message.tensors.length; ++i)
                        $root.hydrosphere.onnx.TensorProto.encode(message.tensors[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                if (message.graphs != null && message.graphs.length)
                    for (var i = 0; i < message.graphs.length; ++i)
                        $root.hydrosphere.onnx.GraphProto.encode(message.graphs[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                if (message.docString != null && message.hasOwnProperty("docString"))
                    writer.uint32(/* id 13, wireType 2 =*/106).string(message.docString);
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 20, wireType 0 =*/160).int32(message.type);
                if (message.refAttrName != null && message.hasOwnProperty("refAttrName"))
                    writer.uint32(/* id 21, wireType 2 =*/170).string(message.refAttrName);
                return writer;
            };

            /**
             * Encodes the specified AttributeProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.AttributeProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.AttributeProto
             * @static
             * @param {hydrosphere.onnx.IAttributeProto} message AttributeProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AttributeProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AttributeProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.AttributeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.AttributeProto} AttributeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AttributeProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.AttributeProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 21:
                        message.refAttrName = reader.string();
                        break;
                    case 13:
                        message.docString = reader.string();
                        break;
                    case 20:
                        message.type = reader.int32();
                        break;
                    case 2:
                        message.f = reader.float();
                        break;
                    case 3:
                        message.i = reader.int64();
                        break;
                    case 4:
                        message.s = reader.bytes();
                        break;
                    case 5:
                        message.t = $root.hydrosphere.onnx.TensorProto.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.g = $root.hydrosphere.onnx.GraphProto.decode(reader, reader.uint32());
                        break;
                    case 7:
                        if (!(message.floats && message.floats.length))
                            message.floats = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.floats.push(reader.float());
                        } else
                            message.floats.push(reader.float());
                        break;
                    case 8:
                        if (!(message.ints && message.ints.length))
                            message.ints = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.ints.push(reader.int64());
                        } else
                            message.ints.push(reader.int64());
                        break;
                    case 9:
                        if (!(message.strings && message.strings.length))
                            message.strings = [];
                        message.strings.push(reader.bytes());
                        break;
                    case 10:
                        if (!(message.tensors && message.tensors.length))
                            message.tensors = [];
                        message.tensors.push($root.hydrosphere.onnx.TensorProto.decode(reader, reader.uint32()));
                        break;
                    case 11:
                        if (!(message.graphs && message.graphs.length))
                            message.graphs = [];
                        message.graphs.push($root.hydrosphere.onnx.GraphProto.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AttributeProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.AttributeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.AttributeProto} AttributeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AttributeProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AttributeProto message.
             * @function verify
             * @memberof hydrosphere.onnx.AttributeProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AttributeProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.refAttrName != null && message.hasOwnProperty("refAttrName"))
                    if (!$util.isString(message.refAttrName))
                        return "refAttrName: string expected";
                if (message.docString != null && message.hasOwnProperty("docString"))
                    if (!$util.isString(message.docString))
                        return "docString: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        break;
                    }
                if (message.f != null && message.hasOwnProperty("f"))
                    if (typeof message.f !== "number")
                        return "f: number expected";
                if (message.i != null && message.hasOwnProperty("i"))
                    if (!$util.isInteger(message.i) && !(message.i && $util.isInteger(message.i.low) && $util.isInteger(message.i.high)))
                        return "i: integer|Long expected";
                if (message.s != null && message.hasOwnProperty("s"))
                    if (!(message.s && typeof message.s.length === "number" || $util.isString(message.s)))
                        return "s: buffer expected";
                if (message.t != null && message.hasOwnProperty("t")) {
                    var error = $root.hydrosphere.onnx.TensorProto.verify(message.t);
                    if (error)
                        return "t." + error;
                }
                if (message.g != null && message.hasOwnProperty("g")) {
                    var error = $root.hydrosphere.onnx.GraphProto.verify(message.g);
                    if (error)
                        return "g." + error;
                }
                if (message.floats != null && message.hasOwnProperty("floats")) {
                    if (!Array.isArray(message.floats))
                        return "floats: array expected";
                    for (var i = 0; i < message.floats.length; ++i)
                        if (typeof message.floats[i] !== "number")
                            return "floats: number[] expected";
                }
                if (message.ints != null && message.hasOwnProperty("ints")) {
                    if (!Array.isArray(message.ints))
                        return "ints: array expected";
                    for (var i = 0; i < message.ints.length; ++i)
                        if (!$util.isInteger(message.ints[i]) && !(message.ints[i] && $util.isInteger(message.ints[i].low) && $util.isInteger(message.ints[i].high)))
                            return "ints: integer|Long[] expected";
                }
                if (message.strings != null && message.hasOwnProperty("strings")) {
                    if (!Array.isArray(message.strings))
                        return "strings: array expected";
                    for (var i = 0; i < message.strings.length; ++i)
                        if (!(message.strings[i] && typeof message.strings[i].length === "number" || $util.isString(message.strings[i])))
                            return "strings: buffer[] expected";
                }
                if (message.tensors != null && message.hasOwnProperty("tensors")) {
                    if (!Array.isArray(message.tensors))
                        return "tensors: array expected";
                    for (var i = 0; i < message.tensors.length; ++i) {
                        var error = $root.hydrosphere.onnx.TensorProto.verify(message.tensors[i]);
                        if (error)
                            return "tensors." + error;
                    }
                }
                if (message.graphs != null && message.hasOwnProperty("graphs")) {
                    if (!Array.isArray(message.graphs))
                        return "graphs: array expected";
                    for (var i = 0; i < message.graphs.length; ++i) {
                        var error = $root.hydrosphere.onnx.GraphProto.verify(message.graphs[i]);
                        if (error)
                            return "graphs." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an AttributeProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.AttributeProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.AttributeProto} AttributeProto
             */
            AttributeProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.AttributeProto)
                    return object;
                var message = new $root.hydrosphere.onnx.AttributeProto();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.refAttrName != null)
                    message.refAttrName = String(object.refAttrName);
                if (object.docString != null)
                    message.docString = String(object.docString);
                switch (object.type) {
                case "UNDEFINED":
                case 0:
                    message.type = 0;
                    break;
                case "FLOAT":
                case 1:
                    message.type = 1;
                    break;
                case "INT":
                case 2:
                    message.type = 2;
                    break;
                case "STRING":
                case 3:
                    message.type = 3;
                    break;
                case "TENSOR":
                case 4:
                    message.type = 4;
                    break;
                case "GRAPH":
                case 5:
                    message.type = 5;
                    break;
                case "FLOATS":
                case 6:
                    message.type = 6;
                    break;
                case "INTS":
                case 7:
                    message.type = 7;
                    break;
                case "STRINGS":
                case 8:
                    message.type = 8;
                    break;
                case "TENSORS":
                case 9:
                    message.type = 9;
                    break;
                case "GRAPHS":
                case 10:
                    message.type = 10;
                    break;
                }
                if (object.f != null)
                    message.f = Number(object.f);
                if (object.i != null)
                    if ($util.Long)
                        (message.i = $util.Long.fromValue(object.i)).unsigned = false;
                    else if (typeof object.i === "string")
                        message.i = parseInt(object.i, 10);
                    else if (typeof object.i === "number")
                        message.i = object.i;
                    else if (typeof object.i === "object")
                        message.i = new $util.LongBits(object.i.low >>> 0, object.i.high >>> 0).toNumber();
                if (object.s != null)
                    if (typeof object.s === "string")
                        $util.base64.decode(object.s, message.s = $util.newBuffer($util.base64.length(object.s)), 0);
                    else if (object.s.length)
                        message.s = object.s;
                if (object.t != null) {
                    if (typeof object.t !== "object")
                        throw TypeError(".hydrosphere.onnx.AttributeProto.t: object expected");
                    message.t = $root.hydrosphere.onnx.TensorProto.fromObject(object.t);
                }
                if (object.g != null) {
                    if (typeof object.g !== "object")
                        throw TypeError(".hydrosphere.onnx.AttributeProto.g: object expected");
                    message.g = $root.hydrosphere.onnx.GraphProto.fromObject(object.g);
                }
                if (object.floats) {
                    if (!Array.isArray(object.floats))
                        throw TypeError(".hydrosphere.onnx.AttributeProto.floats: array expected");
                    message.floats = [];
                    for (var i = 0; i < object.floats.length; ++i)
                        message.floats[i] = Number(object.floats[i]);
                }
                if (object.ints) {
                    if (!Array.isArray(object.ints))
                        throw TypeError(".hydrosphere.onnx.AttributeProto.ints: array expected");
                    message.ints = [];
                    for (var i = 0; i < object.ints.length; ++i)
                        if ($util.Long)
                            (message.ints[i] = $util.Long.fromValue(object.ints[i])).unsigned = false;
                        else if (typeof object.ints[i] === "string")
                            message.ints[i] = parseInt(object.ints[i], 10);
                        else if (typeof object.ints[i] === "number")
                            message.ints[i] = object.ints[i];
                        else if (typeof object.ints[i] === "object")
                            message.ints[i] = new $util.LongBits(object.ints[i].low >>> 0, object.ints[i].high >>> 0).toNumber();
                }
                if (object.strings) {
                    if (!Array.isArray(object.strings))
                        throw TypeError(".hydrosphere.onnx.AttributeProto.strings: array expected");
                    message.strings = [];
                    for (var i = 0; i < object.strings.length; ++i)
                        if (typeof object.strings[i] === "string")
                            $util.base64.decode(object.strings[i], message.strings[i] = $util.newBuffer($util.base64.length(object.strings[i])), 0);
                        else if (object.strings[i].length)
                            message.strings[i] = object.strings[i];
                }
                if (object.tensors) {
                    if (!Array.isArray(object.tensors))
                        throw TypeError(".hydrosphere.onnx.AttributeProto.tensors: array expected");
                    message.tensors = [];
                    for (var i = 0; i < object.tensors.length; ++i) {
                        if (typeof object.tensors[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.AttributeProto.tensors: object expected");
                        message.tensors[i] = $root.hydrosphere.onnx.TensorProto.fromObject(object.tensors[i]);
                    }
                }
                if (object.graphs) {
                    if (!Array.isArray(object.graphs))
                        throw TypeError(".hydrosphere.onnx.AttributeProto.graphs: array expected");
                    message.graphs = [];
                    for (var i = 0; i < object.graphs.length; ++i) {
                        if (typeof object.graphs[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.AttributeProto.graphs: object expected");
                        message.graphs[i] = $root.hydrosphere.onnx.GraphProto.fromObject(object.graphs[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an AttributeProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.AttributeProto
             * @static
             * @param {hydrosphere.onnx.AttributeProto} message AttributeProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AttributeProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.floats = [];
                    object.ints = [];
                    object.strings = [];
                    object.tensors = [];
                    object.graphs = [];
                }
                if (options.defaults) {
                    object.name = "";
                    object.f = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.i = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.i = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                        object.s = "";
                    else {
                        object.s = [];
                        if (options.bytes !== Array)
                            object.s = $util.newBuffer(object.s);
                    }
                    object.t = null;
                    object.g = null;
                    object.docString = "";
                    object.type = options.enums === String ? "UNDEFINED" : 0;
                    object.refAttrName = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.f != null && message.hasOwnProperty("f"))
                    object.f = options.json && !isFinite(message.f) ? String(message.f) : message.f;
                if (message.i != null && message.hasOwnProperty("i"))
                    if (typeof message.i === "number")
                        object.i = options.longs === String ? String(message.i) : message.i;
                    else
                        object.i = options.longs === String ? $util.Long.prototype.toString.call(message.i) : options.longs === Number ? new $util.LongBits(message.i.low >>> 0, message.i.high >>> 0).toNumber() : message.i;
                if (message.s != null && message.hasOwnProperty("s"))
                    object.s = options.bytes === String ? $util.base64.encode(message.s, 0, message.s.length) : options.bytes === Array ? Array.prototype.slice.call(message.s) : message.s;
                if (message.t != null && message.hasOwnProperty("t"))
                    object.t = $root.hydrosphere.onnx.TensorProto.toObject(message.t, options);
                if (message.g != null && message.hasOwnProperty("g"))
                    object.g = $root.hydrosphere.onnx.GraphProto.toObject(message.g, options);
                if (message.floats && message.floats.length) {
                    object.floats = [];
                    for (var j = 0; j < message.floats.length; ++j)
                        object.floats[j] = options.json && !isFinite(message.floats[j]) ? String(message.floats[j]) : message.floats[j];
                }
                if (message.ints && message.ints.length) {
                    object.ints = [];
                    for (var j = 0; j < message.ints.length; ++j)
                        if (typeof message.ints[j] === "number")
                            object.ints[j] = options.longs === String ? String(message.ints[j]) : message.ints[j];
                        else
                            object.ints[j] = options.longs === String ? $util.Long.prototype.toString.call(message.ints[j]) : options.longs === Number ? new $util.LongBits(message.ints[j].low >>> 0, message.ints[j].high >>> 0).toNumber() : message.ints[j];
                }
                if (message.strings && message.strings.length) {
                    object.strings = [];
                    for (var j = 0; j < message.strings.length; ++j)
                        object.strings[j] = options.bytes === String ? $util.base64.encode(message.strings[j], 0, message.strings[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.strings[j]) : message.strings[j];
                }
                if (message.tensors && message.tensors.length) {
                    object.tensors = [];
                    for (var j = 0; j < message.tensors.length; ++j)
                        object.tensors[j] = $root.hydrosphere.onnx.TensorProto.toObject(message.tensors[j], options);
                }
                if (message.graphs && message.graphs.length) {
                    object.graphs = [];
                    for (var j = 0; j < message.graphs.length; ++j)
                        object.graphs[j] = $root.hydrosphere.onnx.GraphProto.toObject(message.graphs[j], options);
                }
                if (message.docString != null && message.hasOwnProperty("docString"))
                    object.docString = message.docString;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.hydrosphere.onnx.AttributeProto.AttributeType[message.type] : message.type;
                if (message.refAttrName != null && message.hasOwnProperty("refAttrName"))
                    object.refAttrName = message.refAttrName;
                return object;
            };

            /**
             * Converts this AttributeProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.AttributeProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AttributeProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * AttributeType enum.
             * @name hydrosphere.onnx.AttributeProto.AttributeType
             * @enum {string}
             * @property {number} UNDEFINED=0 UNDEFINED value
             * @property {number} FLOAT=1 FLOAT value
             * @property {number} INT=2 INT value
             * @property {number} STRING=3 STRING value
             * @property {number} TENSOR=4 TENSOR value
             * @property {number} GRAPH=5 GRAPH value
             * @property {number} FLOATS=6 FLOATS value
             * @property {number} INTS=7 INTS value
             * @property {number} STRINGS=8 STRINGS value
             * @property {number} TENSORS=9 TENSORS value
             * @property {number} GRAPHS=10 GRAPHS value
             */
            AttributeProto.AttributeType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNDEFINED"] = 0;
                values[valuesById[1] = "FLOAT"] = 1;
                values[valuesById[2] = "INT"] = 2;
                values[valuesById[3] = "STRING"] = 3;
                values[valuesById[4] = "TENSOR"] = 4;
                values[valuesById[5] = "GRAPH"] = 5;
                values[valuesById[6] = "FLOATS"] = 6;
                values[valuesById[7] = "INTS"] = 7;
                values[valuesById[8] = "STRINGS"] = 8;
                values[valuesById[9] = "TENSORS"] = 9;
                values[valuesById[10] = "GRAPHS"] = 10;
                return values;
            })();

            return AttributeProto;
        })();

        onnx.ValueInfoProto = (function() {

            /**
             * Properties of a ValueInfoProto.
             * @memberof hydrosphere.onnx
             * @interface IValueInfoProto
             * @property {string|null} [name] ValueInfoProto name
             * @property {hydrosphere.onnx.ITypeProto|null} [type] ValueInfoProto type
             * @property {string|null} [docString] ValueInfoProto docString
             */

            /**
             * Constructs a new ValueInfoProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents a ValueInfoProto.
             * @implements IValueInfoProto
             * @constructor
             * @param {hydrosphere.onnx.IValueInfoProto=} [properties] Properties to set
             */
            function ValueInfoProto(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ValueInfoProto name.
             * @member {string} name
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @instance
             */
            ValueInfoProto.prototype.name = "";

            /**
             * ValueInfoProto type.
             * @member {hydrosphere.onnx.ITypeProto|null|undefined} type
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @instance
             */
            ValueInfoProto.prototype.type = null;

            /**
             * ValueInfoProto docString.
             * @member {string} docString
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @instance
             */
            ValueInfoProto.prototype.docString = "";

            /**
             * Creates a new ValueInfoProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @static
             * @param {hydrosphere.onnx.IValueInfoProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.ValueInfoProto} ValueInfoProto instance
             */
            ValueInfoProto.create = function create(properties) {
                return new ValueInfoProto(properties);
            };

            /**
             * Encodes the specified ValueInfoProto message. Does not implicitly {@link hydrosphere.onnx.ValueInfoProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @static
             * @param {hydrosphere.onnx.IValueInfoProto} message ValueInfoProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ValueInfoProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.type != null && message.hasOwnProperty("type"))
                    $root.hydrosphere.onnx.TypeProto.encode(message.type, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.docString != null && message.hasOwnProperty("docString"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.docString);
                return writer;
            };

            /**
             * Encodes the specified ValueInfoProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.ValueInfoProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @static
             * @param {hydrosphere.onnx.IValueInfoProto} message ValueInfoProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ValueInfoProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ValueInfoProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.ValueInfoProto} ValueInfoProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ValueInfoProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.ValueInfoProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.type = $root.hydrosphere.onnx.TypeProto.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.docString = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ValueInfoProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.ValueInfoProto} ValueInfoProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ValueInfoProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ValueInfoProto message.
             * @function verify
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ValueInfoProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.type != null && message.hasOwnProperty("type")) {
                    var error = $root.hydrosphere.onnx.TypeProto.verify(message.type);
                    if (error)
                        return "type." + error;
                }
                if (message.docString != null && message.hasOwnProperty("docString"))
                    if (!$util.isString(message.docString))
                        return "docString: string expected";
                return null;
            };

            /**
             * Creates a ValueInfoProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.ValueInfoProto} ValueInfoProto
             */
            ValueInfoProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.ValueInfoProto)
                    return object;
                var message = new $root.hydrosphere.onnx.ValueInfoProto();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.type != null) {
                    if (typeof object.type !== "object")
                        throw TypeError(".hydrosphere.onnx.ValueInfoProto.type: object expected");
                    message.type = $root.hydrosphere.onnx.TypeProto.fromObject(object.type);
                }
                if (object.docString != null)
                    message.docString = String(object.docString);
                return message;
            };

            /**
             * Creates a plain object from a ValueInfoProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @static
             * @param {hydrosphere.onnx.ValueInfoProto} message ValueInfoProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ValueInfoProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.type = null;
                    object.docString = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = $root.hydrosphere.onnx.TypeProto.toObject(message.type, options);
                if (message.docString != null && message.hasOwnProperty("docString"))
                    object.docString = message.docString;
                return object;
            };

            /**
             * Converts this ValueInfoProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.ValueInfoProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ValueInfoProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ValueInfoProto;
        })();

        onnx.NodeProto = (function() {

            /**
             * Properties of a NodeProto.
             * @memberof hydrosphere.onnx
             * @interface INodeProto
             * @property {Array.<string>|null} [input] NodeProto input
             * @property {Array.<string>|null} [output] NodeProto output
             * @property {string|null} [name] NodeProto name
             * @property {string|null} [opType] NodeProto opType
             * @property {string|null} [domain] NodeProto domain
             * @property {Array.<hydrosphere.onnx.IAttributeProto>|null} [attribute] NodeProto attribute
             * @property {string|null} [docString] NodeProto docString
             */

            /**
             * Constructs a new NodeProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents a NodeProto.
             * @implements INodeProto
             * @constructor
             * @param {hydrosphere.onnx.INodeProto=} [properties] Properties to set
             */
            function NodeProto(properties) {
                this.input = [];
                this.output = [];
                this.attribute = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NodeProto input.
             * @member {Array.<string>} input
             * @memberof hydrosphere.onnx.NodeProto
             * @instance
             */
            NodeProto.prototype.input = $util.emptyArray;

            /**
             * NodeProto output.
             * @member {Array.<string>} output
             * @memberof hydrosphere.onnx.NodeProto
             * @instance
             */
            NodeProto.prototype.output = $util.emptyArray;

            /**
             * NodeProto name.
             * @member {string} name
             * @memberof hydrosphere.onnx.NodeProto
             * @instance
             */
            NodeProto.prototype.name = "";

            /**
             * NodeProto opType.
             * @member {string} opType
             * @memberof hydrosphere.onnx.NodeProto
             * @instance
             */
            NodeProto.prototype.opType = "";

            /**
             * NodeProto domain.
             * @member {string} domain
             * @memberof hydrosphere.onnx.NodeProto
             * @instance
             */
            NodeProto.prototype.domain = "";

            /**
             * NodeProto attribute.
             * @member {Array.<hydrosphere.onnx.IAttributeProto>} attribute
             * @memberof hydrosphere.onnx.NodeProto
             * @instance
             */
            NodeProto.prototype.attribute = $util.emptyArray;

            /**
             * NodeProto docString.
             * @member {string} docString
             * @memberof hydrosphere.onnx.NodeProto
             * @instance
             */
            NodeProto.prototype.docString = "";

            /**
             * Creates a new NodeProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.NodeProto
             * @static
             * @param {hydrosphere.onnx.INodeProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.NodeProto} NodeProto instance
             */
            NodeProto.create = function create(properties) {
                return new NodeProto(properties);
            };

            /**
             * Encodes the specified NodeProto message. Does not implicitly {@link hydrosphere.onnx.NodeProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.NodeProto
             * @static
             * @param {hydrosphere.onnx.INodeProto} message NodeProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NodeProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.input != null && message.input.length)
                    for (var i = 0; i < message.input.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.input[i]);
                if (message.output != null && message.output.length)
                    for (var i = 0; i < message.output.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.output[i]);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.opType != null && message.hasOwnProperty("opType"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.opType);
                if (message.attribute != null && message.attribute.length)
                    for (var i = 0; i < message.attribute.length; ++i)
                        $root.hydrosphere.onnx.AttributeProto.encode(message.attribute[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.docString != null && message.hasOwnProperty("docString"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.docString);
                if (message.domain != null && message.hasOwnProperty("domain"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.domain);
                return writer;
            };

            /**
             * Encodes the specified NodeProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.NodeProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.NodeProto
             * @static
             * @param {hydrosphere.onnx.INodeProto} message NodeProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NodeProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NodeProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.NodeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.NodeProto} NodeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NodeProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.NodeProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.input && message.input.length))
                            message.input = [];
                        message.input.push(reader.string());
                        break;
                    case 2:
                        if (!(message.output && message.output.length))
                            message.output = [];
                        message.output.push(reader.string());
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        message.opType = reader.string();
                        break;
                    case 7:
                        message.domain = reader.string();
                        break;
                    case 5:
                        if (!(message.attribute && message.attribute.length))
                            message.attribute = [];
                        message.attribute.push($root.hydrosphere.onnx.AttributeProto.decode(reader, reader.uint32()));
                        break;
                    case 6:
                        message.docString = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NodeProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.NodeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.NodeProto} NodeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NodeProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NodeProto message.
             * @function verify
             * @memberof hydrosphere.onnx.NodeProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NodeProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.input != null && message.hasOwnProperty("input")) {
                    if (!Array.isArray(message.input))
                        return "input: array expected";
                    for (var i = 0; i < message.input.length; ++i)
                        if (!$util.isString(message.input[i]))
                            return "input: string[] expected";
                }
                if (message.output != null && message.hasOwnProperty("output")) {
                    if (!Array.isArray(message.output))
                        return "output: array expected";
                    for (var i = 0; i < message.output.length; ++i)
                        if (!$util.isString(message.output[i]))
                            return "output: string[] expected";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.opType != null && message.hasOwnProperty("opType"))
                    if (!$util.isString(message.opType))
                        return "opType: string expected";
                if (message.domain != null && message.hasOwnProperty("domain"))
                    if (!$util.isString(message.domain))
                        return "domain: string expected";
                if (message.attribute != null && message.hasOwnProperty("attribute")) {
                    if (!Array.isArray(message.attribute))
                        return "attribute: array expected";
                    for (var i = 0; i < message.attribute.length; ++i) {
                        var error = $root.hydrosphere.onnx.AttributeProto.verify(message.attribute[i]);
                        if (error)
                            return "attribute." + error;
                    }
                }
                if (message.docString != null && message.hasOwnProperty("docString"))
                    if (!$util.isString(message.docString))
                        return "docString: string expected";
                return null;
            };

            /**
             * Creates a NodeProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.NodeProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.NodeProto} NodeProto
             */
            NodeProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.NodeProto)
                    return object;
                var message = new $root.hydrosphere.onnx.NodeProto();
                if (object.input) {
                    if (!Array.isArray(object.input))
                        throw TypeError(".hydrosphere.onnx.NodeProto.input: array expected");
                    message.input = [];
                    for (var i = 0; i < object.input.length; ++i)
                        message.input[i] = String(object.input[i]);
                }
                if (object.output) {
                    if (!Array.isArray(object.output))
                        throw TypeError(".hydrosphere.onnx.NodeProto.output: array expected");
                    message.output = [];
                    for (var i = 0; i < object.output.length; ++i)
                        message.output[i] = String(object.output[i]);
                }
                if (object.name != null)
                    message.name = String(object.name);
                if (object.opType != null)
                    message.opType = String(object.opType);
                if (object.domain != null)
                    message.domain = String(object.domain);
                if (object.attribute) {
                    if (!Array.isArray(object.attribute))
                        throw TypeError(".hydrosphere.onnx.NodeProto.attribute: array expected");
                    message.attribute = [];
                    for (var i = 0; i < object.attribute.length; ++i) {
                        if (typeof object.attribute[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.NodeProto.attribute: object expected");
                        message.attribute[i] = $root.hydrosphere.onnx.AttributeProto.fromObject(object.attribute[i]);
                    }
                }
                if (object.docString != null)
                    message.docString = String(object.docString);
                return message;
            };

            /**
             * Creates a plain object from a NodeProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.NodeProto
             * @static
             * @param {hydrosphere.onnx.NodeProto} message NodeProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NodeProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.input = [];
                    object.output = [];
                    object.attribute = [];
                }
                if (options.defaults) {
                    object.name = "";
                    object.opType = "";
                    object.docString = "";
                    object.domain = "";
                }
                if (message.input && message.input.length) {
                    object.input = [];
                    for (var j = 0; j < message.input.length; ++j)
                        object.input[j] = message.input[j];
                }
                if (message.output && message.output.length) {
                    object.output = [];
                    for (var j = 0; j < message.output.length; ++j)
                        object.output[j] = message.output[j];
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.opType != null && message.hasOwnProperty("opType"))
                    object.opType = message.opType;
                if (message.attribute && message.attribute.length) {
                    object.attribute = [];
                    for (var j = 0; j < message.attribute.length; ++j)
                        object.attribute[j] = $root.hydrosphere.onnx.AttributeProto.toObject(message.attribute[j], options);
                }
                if (message.docString != null && message.hasOwnProperty("docString"))
                    object.docString = message.docString;
                if (message.domain != null && message.hasOwnProperty("domain"))
                    object.domain = message.domain;
                return object;
            };

            /**
             * Converts this NodeProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.NodeProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NodeProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return NodeProto;
        })();

        onnx.ModelProto = (function() {

            /**
             * Properties of a ModelProto.
             * @memberof hydrosphere.onnx
             * @interface IModelProto
             * @property {number|Long|null} [irVersion] ModelProto irVersion
             * @property {Array.<hydrosphere.onnx.IOperatorSetIdProto>|null} [opsetImport] ModelProto opsetImport
             * @property {string|null} [producerName] ModelProto producerName
             * @property {string|null} [producerVersion] ModelProto producerVersion
             * @property {string|null} [domain] ModelProto domain
             * @property {number|Long|null} [modelVersion] ModelProto modelVersion
             * @property {string|null} [docString] ModelProto docString
             * @property {hydrosphere.onnx.IGraphProto|null} [graph] ModelProto graph
             * @property {Array.<hydrosphere.onnx.IStringStringEntryProto>|null} [metadataProps] ModelProto metadataProps
             */

            /**
             * Constructs a new ModelProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents a ModelProto.
             * @implements IModelProto
             * @constructor
             * @param {hydrosphere.onnx.IModelProto=} [properties] Properties to set
             */
            function ModelProto(properties) {
                this.opsetImport = [];
                this.metadataProps = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ModelProto irVersion.
             * @member {number|Long} irVersion
             * @memberof hydrosphere.onnx.ModelProto
             * @instance
             */
            ModelProto.prototype.irVersion = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ModelProto opsetImport.
             * @member {Array.<hydrosphere.onnx.IOperatorSetIdProto>} opsetImport
             * @memberof hydrosphere.onnx.ModelProto
             * @instance
             */
            ModelProto.prototype.opsetImport = $util.emptyArray;

            /**
             * ModelProto producerName.
             * @member {string} producerName
             * @memberof hydrosphere.onnx.ModelProto
             * @instance
             */
            ModelProto.prototype.producerName = "";

            /**
             * ModelProto producerVersion.
             * @member {string} producerVersion
             * @memberof hydrosphere.onnx.ModelProto
             * @instance
             */
            ModelProto.prototype.producerVersion = "";

            /**
             * ModelProto domain.
             * @member {string} domain
             * @memberof hydrosphere.onnx.ModelProto
             * @instance
             */
            ModelProto.prototype.domain = "";

            /**
             * ModelProto modelVersion.
             * @member {number|Long} modelVersion
             * @memberof hydrosphere.onnx.ModelProto
             * @instance
             */
            ModelProto.prototype.modelVersion = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ModelProto docString.
             * @member {string} docString
             * @memberof hydrosphere.onnx.ModelProto
             * @instance
             */
            ModelProto.prototype.docString = "";

            /**
             * ModelProto graph.
             * @member {hydrosphere.onnx.IGraphProto|null|undefined} graph
             * @memberof hydrosphere.onnx.ModelProto
             * @instance
             */
            ModelProto.prototype.graph = null;

            /**
             * ModelProto metadataProps.
             * @member {Array.<hydrosphere.onnx.IStringStringEntryProto>} metadataProps
             * @memberof hydrosphere.onnx.ModelProto
             * @instance
             */
            ModelProto.prototype.metadataProps = $util.emptyArray;

            /**
             * Creates a new ModelProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.ModelProto
             * @static
             * @param {hydrosphere.onnx.IModelProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.ModelProto} ModelProto instance
             */
            ModelProto.create = function create(properties) {
                return new ModelProto(properties);
            };

            /**
             * Encodes the specified ModelProto message. Does not implicitly {@link hydrosphere.onnx.ModelProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.ModelProto
             * @static
             * @param {hydrosphere.onnx.IModelProto} message ModelProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.irVersion != null && message.hasOwnProperty("irVersion"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.irVersion);
                if (message.producerName != null && message.hasOwnProperty("producerName"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.producerName);
                if (message.producerVersion != null && message.hasOwnProperty("producerVersion"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.producerVersion);
                if (message.domain != null && message.hasOwnProperty("domain"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.domain);
                if (message.modelVersion != null && message.hasOwnProperty("modelVersion"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.modelVersion);
                if (message.docString != null && message.hasOwnProperty("docString"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.docString);
                if (message.graph != null && message.hasOwnProperty("graph"))
                    $root.hydrosphere.onnx.GraphProto.encode(message.graph, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.opsetImport != null && message.opsetImport.length)
                    for (var i = 0; i < message.opsetImport.length; ++i)
                        $root.hydrosphere.onnx.OperatorSetIdProto.encode(message.opsetImport[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                if (message.metadataProps != null && message.metadataProps.length)
                    for (var i = 0; i < message.metadataProps.length; ++i)
                        $root.hydrosphere.onnx.StringStringEntryProto.encode(message.metadataProps[i], writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ModelProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.ModelProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.ModelProto
             * @static
             * @param {hydrosphere.onnx.IModelProto} message ModelProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ModelProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.ModelProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.ModelProto} ModelProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.ModelProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.irVersion = reader.int64();
                        break;
                    case 8:
                        if (!(message.opsetImport && message.opsetImport.length))
                            message.opsetImport = [];
                        message.opsetImport.push($root.hydrosphere.onnx.OperatorSetIdProto.decode(reader, reader.uint32()));
                        break;
                    case 2:
                        message.producerName = reader.string();
                        break;
                    case 3:
                        message.producerVersion = reader.string();
                        break;
                    case 4:
                        message.domain = reader.string();
                        break;
                    case 5:
                        message.modelVersion = reader.int64();
                        break;
                    case 6:
                        message.docString = reader.string();
                        break;
                    case 7:
                        message.graph = $root.hydrosphere.onnx.GraphProto.decode(reader, reader.uint32());
                        break;
                    case 14:
                        if (!(message.metadataProps && message.metadataProps.length))
                            message.metadataProps = [];
                        message.metadataProps.push($root.hydrosphere.onnx.StringStringEntryProto.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ModelProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.ModelProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.ModelProto} ModelProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ModelProto message.
             * @function verify
             * @memberof hydrosphere.onnx.ModelProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ModelProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.irVersion != null && message.hasOwnProperty("irVersion"))
                    if (!$util.isInteger(message.irVersion) && !(message.irVersion && $util.isInteger(message.irVersion.low) && $util.isInteger(message.irVersion.high)))
                        return "irVersion: integer|Long expected";
                if (message.opsetImport != null && message.hasOwnProperty("opsetImport")) {
                    if (!Array.isArray(message.opsetImport))
                        return "opsetImport: array expected";
                    for (var i = 0; i < message.opsetImport.length; ++i) {
                        var error = $root.hydrosphere.onnx.OperatorSetIdProto.verify(message.opsetImport[i]);
                        if (error)
                            return "opsetImport." + error;
                    }
                }
                if (message.producerName != null && message.hasOwnProperty("producerName"))
                    if (!$util.isString(message.producerName))
                        return "producerName: string expected";
                if (message.producerVersion != null && message.hasOwnProperty("producerVersion"))
                    if (!$util.isString(message.producerVersion))
                        return "producerVersion: string expected";
                if (message.domain != null && message.hasOwnProperty("domain"))
                    if (!$util.isString(message.domain))
                        return "domain: string expected";
                if (message.modelVersion != null && message.hasOwnProperty("modelVersion"))
                    if (!$util.isInteger(message.modelVersion) && !(message.modelVersion && $util.isInteger(message.modelVersion.low) && $util.isInteger(message.modelVersion.high)))
                        return "modelVersion: integer|Long expected";
                if (message.docString != null && message.hasOwnProperty("docString"))
                    if (!$util.isString(message.docString))
                        return "docString: string expected";
                if (message.graph != null && message.hasOwnProperty("graph")) {
                    var error = $root.hydrosphere.onnx.GraphProto.verify(message.graph);
                    if (error)
                        return "graph." + error;
                }
                if (message.metadataProps != null && message.hasOwnProperty("metadataProps")) {
                    if (!Array.isArray(message.metadataProps))
                        return "metadataProps: array expected";
                    for (var i = 0; i < message.metadataProps.length; ++i) {
                        var error = $root.hydrosphere.onnx.StringStringEntryProto.verify(message.metadataProps[i]);
                        if (error)
                            return "metadataProps." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ModelProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.ModelProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.ModelProto} ModelProto
             */
            ModelProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.ModelProto)
                    return object;
                var message = new $root.hydrosphere.onnx.ModelProto();
                if (object.irVersion != null)
                    if ($util.Long)
                        (message.irVersion = $util.Long.fromValue(object.irVersion)).unsigned = false;
                    else if (typeof object.irVersion === "string")
                        message.irVersion = parseInt(object.irVersion, 10);
                    else if (typeof object.irVersion === "number")
                        message.irVersion = object.irVersion;
                    else if (typeof object.irVersion === "object")
                        message.irVersion = new $util.LongBits(object.irVersion.low >>> 0, object.irVersion.high >>> 0).toNumber();
                if (object.opsetImport) {
                    if (!Array.isArray(object.opsetImport))
                        throw TypeError(".hydrosphere.onnx.ModelProto.opsetImport: array expected");
                    message.opsetImport = [];
                    for (var i = 0; i < object.opsetImport.length; ++i) {
                        if (typeof object.opsetImport[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.ModelProto.opsetImport: object expected");
                        message.opsetImport[i] = $root.hydrosphere.onnx.OperatorSetIdProto.fromObject(object.opsetImport[i]);
                    }
                }
                if (object.producerName != null)
                    message.producerName = String(object.producerName);
                if (object.producerVersion != null)
                    message.producerVersion = String(object.producerVersion);
                if (object.domain != null)
                    message.domain = String(object.domain);
                if (object.modelVersion != null)
                    if ($util.Long)
                        (message.modelVersion = $util.Long.fromValue(object.modelVersion)).unsigned = false;
                    else if (typeof object.modelVersion === "string")
                        message.modelVersion = parseInt(object.modelVersion, 10);
                    else if (typeof object.modelVersion === "number")
                        message.modelVersion = object.modelVersion;
                    else if (typeof object.modelVersion === "object")
                        message.modelVersion = new $util.LongBits(object.modelVersion.low >>> 0, object.modelVersion.high >>> 0).toNumber();
                if (object.docString != null)
                    message.docString = String(object.docString);
                if (object.graph != null) {
                    if (typeof object.graph !== "object")
                        throw TypeError(".hydrosphere.onnx.ModelProto.graph: object expected");
                    message.graph = $root.hydrosphere.onnx.GraphProto.fromObject(object.graph);
                }
                if (object.metadataProps) {
                    if (!Array.isArray(object.metadataProps))
                        throw TypeError(".hydrosphere.onnx.ModelProto.metadataProps: array expected");
                    message.metadataProps = [];
                    for (var i = 0; i < object.metadataProps.length; ++i) {
                        if (typeof object.metadataProps[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.ModelProto.metadataProps: object expected");
                        message.metadataProps[i] = $root.hydrosphere.onnx.StringStringEntryProto.fromObject(object.metadataProps[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a ModelProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.ModelProto
             * @static
             * @param {hydrosphere.onnx.ModelProto} message ModelProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ModelProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.opsetImport = [];
                    object.metadataProps = [];
                }
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.irVersion = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.irVersion = options.longs === String ? "0" : 0;
                    object.producerName = "";
                    object.producerVersion = "";
                    object.domain = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.modelVersion = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.modelVersion = options.longs === String ? "0" : 0;
                    object.docString = "";
                    object.graph = null;
                }
                if (message.irVersion != null && message.hasOwnProperty("irVersion"))
                    if (typeof message.irVersion === "number")
                        object.irVersion = options.longs === String ? String(message.irVersion) : message.irVersion;
                    else
                        object.irVersion = options.longs === String ? $util.Long.prototype.toString.call(message.irVersion) : options.longs === Number ? new $util.LongBits(message.irVersion.low >>> 0, message.irVersion.high >>> 0).toNumber() : message.irVersion;
                if (message.producerName != null && message.hasOwnProperty("producerName"))
                    object.producerName = message.producerName;
                if (message.producerVersion != null && message.hasOwnProperty("producerVersion"))
                    object.producerVersion = message.producerVersion;
                if (message.domain != null && message.hasOwnProperty("domain"))
                    object.domain = message.domain;
                if (message.modelVersion != null && message.hasOwnProperty("modelVersion"))
                    if (typeof message.modelVersion === "number")
                        object.modelVersion = options.longs === String ? String(message.modelVersion) : message.modelVersion;
                    else
                        object.modelVersion = options.longs === String ? $util.Long.prototype.toString.call(message.modelVersion) : options.longs === Number ? new $util.LongBits(message.modelVersion.low >>> 0, message.modelVersion.high >>> 0).toNumber() : message.modelVersion;
                if (message.docString != null && message.hasOwnProperty("docString"))
                    object.docString = message.docString;
                if (message.graph != null && message.hasOwnProperty("graph"))
                    object.graph = $root.hydrosphere.onnx.GraphProto.toObject(message.graph, options);
                if (message.opsetImport && message.opsetImport.length) {
                    object.opsetImport = [];
                    for (var j = 0; j < message.opsetImport.length; ++j)
                        object.opsetImport[j] = $root.hydrosphere.onnx.OperatorSetIdProto.toObject(message.opsetImport[j], options);
                }
                if (message.metadataProps && message.metadataProps.length) {
                    object.metadataProps = [];
                    for (var j = 0; j < message.metadataProps.length; ++j)
                        object.metadataProps[j] = $root.hydrosphere.onnx.StringStringEntryProto.toObject(message.metadataProps[j], options);
                }
                return object;
            };

            /**
             * Converts this ModelProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.ModelProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ModelProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ModelProto;
        })();

        onnx.StringStringEntryProto = (function() {

            /**
             * Properties of a StringStringEntryProto.
             * @memberof hydrosphere.onnx
             * @interface IStringStringEntryProto
             * @property {string|null} [key] StringStringEntryProto key
             * @property {string|null} [value] StringStringEntryProto value
             */

            /**
             * Constructs a new StringStringEntryProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents a StringStringEntryProto.
             * @implements IStringStringEntryProto
             * @constructor
             * @param {hydrosphere.onnx.IStringStringEntryProto=} [properties] Properties to set
             */
            function StringStringEntryProto(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * StringStringEntryProto key.
             * @member {string} key
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @instance
             */
            StringStringEntryProto.prototype.key = "";

            /**
             * StringStringEntryProto value.
             * @member {string} value
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @instance
             */
            StringStringEntryProto.prototype.value = "";

            /**
             * Creates a new StringStringEntryProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @static
             * @param {hydrosphere.onnx.IStringStringEntryProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.StringStringEntryProto} StringStringEntryProto instance
             */
            StringStringEntryProto.create = function create(properties) {
                return new StringStringEntryProto(properties);
            };

            /**
             * Encodes the specified StringStringEntryProto message. Does not implicitly {@link hydrosphere.onnx.StringStringEntryProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @static
             * @param {hydrosphere.onnx.IStringStringEntryProto} message StringStringEntryProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StringStringEntryProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.key != null && message.hasOwnProperty("key"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
                return writer;
            };

            /**
             * Encodes the specified StringStringEntryProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.StringStringEntryProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @static
             * @param {hydrosphere.onnx.IStringStringEntryProto} message StringStringEntryProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StringStringEntryProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StringStringEntryProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.StringStringEntryProto} StringStringEntryProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StringStringEntryProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.StringStringEntryProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.key = reader.string();
                        break;
                    case 2:
                        message.value = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StringStringEntryProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.StringStringEntryProto} StringStringEntryProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StringStringEntryProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StringStringEntryProto message.
             * @function verify
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StringStringEntryProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.key != null && message.hasOwnProperty("key"))
                    if (!$util.isString(message.key))
                        return "key: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isString(message.value))
                        return "value: string expected";
                return null;
            };

            /**
             * Creates a StringStringEntryProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.StringStringEntryProto} StringStringEntryProto
             */
            StringStringEntryProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.StringStringEntryProto)
                    return object;
                var message = new $root.hydrosphere.onnx.StringStringEntryProto();
                if (object.key != null)
                    message.key = String(object.key);
                if (object.value != null)
                    message.value = String(object.value);
                return message;
            };

            /**
             * Creates a plain object from a StringStringEntryProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @static
             * @param {hydrosphere.onnx.StringStringEntryProto} message StringStringEntryProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StringStringEntryProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.key = "";
                    object.value = "";
                }
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = message.key;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this StringStringEntryProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.StringStringEntryProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StringStringEntryProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return StringStringEntryProto;
        })();

        onnx.GraphProto = (function() {

            /**
             * Properties of a GraphProto.
             * @memberof hydrosphere.onnx
             * @interface IGraphProto
             * @property {Array.<hydrosphere.onnx.INodeProto>|null} [node] GraphProto node
             * @property {string|null} [name] GraphProto name
             * @property {Array.<hydrosphere.onnx.ITensorProto>|null} [initializer] GraphProto initializer
             * @property {string|null} [docString] GraphProto docString
             * @property {Array.<hydrosphere.onnx.IValueInfoProto>|null} [input] GraphProto input
             * @property {Array.<hydrosphere.onnx.IValueInfoProto>|null} [output] GraphProto output
             * @property {Array.<hydrosphere.onnx.IValueInfoProto>|null} [valueInfo] GraphProto valueInfo
             */

            /**
             * Constructs a new GraphProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents a GraphProto.
             * @implements IGraphProto
             * @constructor
             * @param {hydrosphere.onnx.IGraphProto=} [properties] Properties to set
             */
            function GraphProto(properties) {
                this.node = [];
                this.initializer = [];
                this.input = [];
                this.output = [];
                this.valueInfo = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GraphProto node.
             * @member {Array.<hydrosphere.onnx.INodeProto>} node
             * @memberof hydrosphere.onnx.GraphProto
             * @instance
             */
            GraphProto.prototype.node = $util.emptyArray;

            /**
             * GraphProto name.
             * @member {string} name
             * @memberof hydrosphere.onnx.GraphProto
             * @instance
             */
            GraphProto.prototype.name = "";

            /**
             * GraphProto initializer.
             * @member {Array.<hydrosphere.onnx.ITensorProto>} initializer
             * @memberof hydrosphere.onnx.GraphProto
             * @instance
             */
            GraphProto.prototype.initializer = $util.emptyArray;

            /**
             * GraphProto docString.
             * @member {string} docString
             * @memberof hydrosphere.onnx.GraphProto
             * @instance
             */
            GraphProto.prototype.docString = "";

            /**
             * GraphProto input.
             * @member {Array.<hydrosphere.onnx.IValueInfoProto>} input
             * @memberof hydrosphere.onnx.GraphProto
             * @instance
             */
            GraphProto.prototype.input = $util.emptyArray;

            /**
             * GraphProto output.
             * @member {Array.<hydrosphere.onnx.IValueInfoProto>} output
             * @memberof hydrosphere.onnx.GraphProto
             * @instance
             */
            GraphProto.prototype.output = $util.emptyArray;

            /**
             * GraphProto valueInfo.
             * @member {Array.<hydrosphere.onnx.IValueInfoProto>} valueInfo
             * @memberof hydrosphere.onnx.GraphProto
             * @instance
             */
            GraphProto.prototype.valueInfo = $util.emptyArray;

            /**
             * Creates a new GraphProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.GraphProto
             * @static
             * @param {hydrosphere.onnx.IGraphProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.GraphProto} GraphProto instance
             */
            GraphProto.create = function create(properties) {
                return new GraphProto(properties);
            };

            /**
             * Encodes the specified GraphProto message. Does not implicitly {@link hydrosphere.onnx.GraphProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.GraphProto
             * @static
             * @param {hydrosphere.onnx.IGraphProto} message GraphProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GraphProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.node != null && message.node.length)
                    for (var i = 0; i < message.node.length; ++i)
                        $root.hydrosphere.onnx.NodeProto.encode(message.node[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.initializer != null && message.initializer.length)
                    for (var i = 0; i < message.initializer.length; ++i)
                        $root.hydrosphere.onnx.TensorProto.encode(message.initializer[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.docString != null && message.hasOwnProperty("docString"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.docString);
                if (message.input != null && message.input.length)
                    for (var i = 0; i < message.input.length; ++i)
                        $root.hydrosphere.onnx.ValueInfoProto.encode(message.input[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                if (message.output != null && message.output.length)
                    for (var i = 0; i < message.output.length; ++i)
                        $root.hydrosphere.onnx.ValueInfoProto.encode(message.output[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                if (message.valueInfo != null && message.valueInfo.length)
                    for (var i = 0; i < message.valueInfo.length; ++i)
                        $root.hydrosphere.onnx.ValueInfoProto.encode(message.valueInfo[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified GraphProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.GraphProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.GraphProto
             * @static
             * @param {hydrosphere.onnx.IGraphProto} message GraphProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GraphProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GraphProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.GraphProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.GraphProto} GraphProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GraphProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.GraphProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.node && message.node.length))
                            message.node = [];
                        message.node.push($root.hydrosphere.onnx.NodeProto.decode(reader, reader.uint32()));
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 5:
                        if (!(message.initializer && message.initializer.length))
                            message.initializer = [];
                        message.initializer.push($root.hydrosphere.onnx.TensorProto.decode(reader, reader.uint32()));
                        break;
                    case 10:
                        message.docString = reader.string();
                        break;
                    case 11:
                        if (!(message.input && message.input.length))
                            message.input = [];
                        message.input.push($root.hydrosphere.onnx.ValueInfoProto.decode(reader, reader.uint32()));
                        break;
                    case 12:
                        if (!(message.output && message.output.length))
                            message.output = [];
                        message.output.push($root.hydrosphere.onnx.ValueInfoProto.decode(reader, reader.uint32()));
                        break;
                    case 13:
                        if (!(message.valueInfo && message.valueInfo.length))
                            message.valueInfo = [];
                        message.valueInfo.push($root.hydrosphere.onnx.ValueInfoProto.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GraphProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.GraphProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.GraphProto} GraphProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GraphProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GraphProto message.
             * @function verify
             * @memberof hydrosphere.onnx.GraphProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GraphProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.node != null && message.hasOwnProperty("node")) {
                    if (!Array.isArray(message.node))
                        return "node: array expected";
                    for (var i = 0; i < message.node.length; ++i) {
                        var error = $root.hydrosphere.onnx.NodeProto.verify(message.node[i]);
                        if (error)
                            return "node." + error;
                    }
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.initializer != null && message.hasOwnProperty("initializer")) {
                    if (!Array.isArray(message.initializer))
                        return "initializer: array expected";
                    for (var i = 0; i < message.initializer.length; ++i) {
                        var error = $root.hydrosphere.onnx.TensorProto.verify(message.initializer[i]);
                        if (error)
                            return "initializer." + error;
                    }
                }
                if (message.docString != null && message.hasOwnProperty("docString"))
                    if (!$util.isString(message.docString))
                        return "docString: string expected";
                if (message.input != null && message.hasOwnProperty("input")) {
                    if (!Array.isArray(message.input))
                        return "input: array expected";
                    for (var i = 0; i < message.input.length; ++i) {
                        var error = $root.hydrosphere.onnx.ValueInfoProto.verify(message.input[i]);
                        if (error)
                            return "input." + error;
                    }
                }
                if (message.output != null && message.hasOwnProperty("output")) {
                    if (!Array.isArray(message.output))
                        return "output: array expected";
                    for (var i = 0; i < message.output.length; ++i) {
                        var error = $root.hydrosphere.onnx.ValueInfoProto.verify(message.output[i]);
                        if (error)
                            return "output." + error;
                    }
                }
                if (message.valueInfo != null && message.hasOwnProperty("valueInfo")) {
                    if (!Array.isArray(message.valueInfo))
                        return "valueInfo: array expected";
                    for (var i = 0; i < message.valueInfo.length; ++i) {
                        var error = $root.hydrosphere.onnx.ValueInfoProto.verify(message.valueInfo[i]);
                        if (error)
                            return "valueInfo." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a GraphProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.GraphProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.GraphProto} GraphProto
             */
            GraphProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.GraphProto)
                    return object;
                var message = new $root.hydrosphere.onnx.GraphProto();
                if (object.node) {
                    if (!Array.isArray(object.node))
                        throw TypeError(".hydrosphere.onnx.GraphProto.node: array expected");
                    message.node = [];
                    for (var i = 0; i < object.node.length; ++i) {
                        if (typeof object.node[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.GraphProto.node: object expected");
                        message.node[i] = $root.hydrosphere.onnx.NodeProto.fromObject(object.node[i]);
                    }
                }
                if (object.name != null)
                    message.name = String(object.name);
                if (object.initializer) {
                    if (!Array.isArray(object.initializer))
                        throw TypeError(".hydrosphere.onnx.GraphProto.initializer: array expected");
                    message.initializer = [];
                    for (var i = 0; i < object.initializer.length; ++i) {
                        if (typeof object.initializer[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.GraphProto.initializer: object expected");
                        message.initializer[i] = $root.hydrosphere.onnx.TensorProto.fromObject(object.initializer[i]);
                    }
                }
                if (object.docString != null)
                    message.docString = String(object.docString);
                if (object.input) {
                    if (!Array.isArray(object.input))
                        throw TypeError(".hydrosphere.onnx.GraphProto.input: array expected");
                    message.input = [];
                    for (var i = 0; i < object.input.length; ++i) {
                        if (typeof object.input[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.GraphProto.input: object expected");
                        message.input[i] = $root.hydrosphere.onnx.ValueInfoProto.fromObject(object.input[i]);
                    }
                }
                if (object.output) {
                    if (!Array.isArray(object.output))
                        throw TypeError(".hydrosphere.onnx.GraphProto.output: array expected");
                    message.output = [];
                    for (var i = 0; i < object.output.length; ++i) {
                        if (typeof object.output[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.GraphProto.output: object expected");
                        message.output[i] = $root.hydrosphere.onnx.ValueInfoProto.fromObject(object.output[i]);
                    }
                }
                if (object.valueInfo) {
                    if (!Array.isArray(object.valueInfo))
                        throw TypeError(".hydrosphere.onnx.GraphProto.valueInfo: array expected");
                    message.valueInfo = [];
                    for (var i = 0; i < object.valueInfo.length; ++i) {
                        if (typeof object.valueInfo[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.GraphProto.valueInfo: object expected");
                        message.valueInfo[i] = $root.hydrosphere.onnx.ValueInfoProto.fromObject(object.valueInfo[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GraphProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.GraphProto
             * @static
             * @param {hydrosphere.onnx.GraphProto} message GraphProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GraphProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.node = [];
                    object.initializer = [];
                    object.input = [];
                    object.output = [];
                    object.valueInfo = [];
                }
                if (options.defaults) {
                    object.name = "";
                    object.docString = "";
                }
                if (message.node && message.node.length) {
                    object.node = [];
                    for (var j = 0; j < message.node.length; ++j)
                        object.node[j] = $root.hydrosphere.onnx.NodeProto.toObject(message.node[j], options);
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.initializer && message.initializer.length) {
                    object.initializer = [];
                    for (var j = 0; j < message.initializer.length; ++j)
                        object.initializer[j] = $root.hydrosphere.onnx.TensorProto.toObject(message.initializer[j], options);
                }
                if (message.docString != null && message.hasOwnProperty("docString"))
                    object.docString = message.docString;
                if (message.input && message.input.length) {
                    object.input = [];
                    for (var j = 0; j < message.input.length; ++j)
                        object.input[j] = $root.hydrosphere.onnx.ValueInfoProto.toObject(message.input[j], options);
                }
                if (message.output && message.output.length) {
                    object.output = [];
                    for (var j = 0; j < message.output.length; ++j)
                        object.output[j] = $root.hydrosphere.onnx.ValueInfoProto.toObject(message.output[j], options);
                }
                if (message.valueInfo && message.valueInfo.length) {
                    object.valueInfo = [];
                    for (var j = 0; j < message.valueInfo.length; ++j)
                        object.valueInfo[j] = $root.hydrosphere.onnx.ValueInfoProto.toObject(message.valueInfo[j], options);
                }
                return object;
            };

            /**
             * Converts this GraphProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.GraphProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GraphProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GraphProto;
        })();

        onnx.TensorProto = (function() {

            /**
             * Properties of a TensorProto.
             * @memberof hydrosphere.onnx
             * @interface ITensorProto
             * @property {Array.<number|Long>|null} [dims] TensorProto dims
             * @property {hydrosphere.onnx.TensorProto.DataType|null} [dataType] TensorProto dataType
             * @property {hydrosphere.onnx.TensorProto.ISegment|null} [segment] TensorProto segment
             * @property {Array.<number>|null} [floatData] TensorProto floatData
             * @property {Array.<number>|null} [int32Data] TensorProto int32Data
             * @property {Array.<Uint8Array>|null} [stringData] TensorProto stringData
             * @property {Array.<number|Long>|null} [int64Data] TensorProto int64Data
             * @property {string|null} [name] TensorProto name
             * @property {string|null} [docString] TensorProto docString
             * @property {Uint8Array|null} [rawData] TensorProto rawData
             * @property {Array.<number>|null} [doubleData] TensorProto doubleData
             * @property {Array.<number|Long>|null} [uint64Data] TensorProto uint64Data
             */

            /**
             * Constructs a new TensorProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents a TensorProto.
             * @implements ITensorProto
             * @constructor
             * @param {hydrosphere.onnx.ITensorProto=} [properties] Properties to set
             */
            function TensorProto(properties) {
                this.dims = [];
                this.floatData = [];
                this.int32Data = [];
                this.stringData = [];
                this.int64Data = [];
                this.doubleData = [];
                this.uint64Data = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TensorProto dims.
             * @member {Array.<number|Long>} dims
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.dims = $util.emptyArray;

            /**
             * TensorProto dataType.
             * @member {hydrosphere.onnx.TensorProto.DataType} dataType
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.dataType = 0;

            /**
             * TensorProto segment.
             * @member {hydrosphere.onnx.TensorProto.ISegment|null|undefined} segment
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.segment = null;

            /**
             * TensorProto floatData.
             * @member {Array.<number>} floatData
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.floatData = $util.emptyArray;

            /**
             * TensorProto int32Data.
             * @member {Array.<number>} int32Data
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.int32Data = $util.emptyArray;

            /**
             * TensorProto stringData.
             * @member {Array.<Uint8Array>} stringData
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.stringData = $util.emptyArray;

            /**
             * TensorProto int64Data.
             * @member {Array.<number|Long>} int64Data
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.int64Data = $util.emptyArray;

            /**
             * TensorProto name.
             * @member {string} name
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.name = "";

            /**
             * TensorProto docString.
             * @member {string} docString
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.docString = "";

            /**
             * TensorProto rawData.
             * @member {Uint8Array} rawData
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.rawData = $util.newBuffer([]);

            /**
             * TensorProto doubleData.
             * @member {Array.<number>} doubleData
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.doubleData = $util.emptyArray;

            /**
             * TensorProto uint64Data.
             * @member {Array.<number|Long>} uint64Data
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             */
            TensorProto.prototype.uint64Data = $util.emptyArray;

            /**
             * Creates a new TensorProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.TensorProto
             * @static
             * @param {hydrosphere.onnx.ITensorProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.TensorProto} TensorProto instance
             */
            TensorProto.create = function create(properties) {
                return new TensorProto(properties);
            };

            /**
             * Encodes the specified TensorProto message. Does not implicitly {@link hydrosphere.onnx.TensorProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.TensorProto
             * @static
             * @param {hydrosphere.onnx.ITensorProto} message TensorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TensorProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.dims != null && message.dims.length) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork();
                    for (var i = 0; i < message.dims.length; ++i)
                        writer.int64(message.dims[i]);
                    writer.ldelim();
                }
                if (message.dataType != null && message.hasOwnProperty("dataType"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.dataType);
                if (message.segment != null && message.hasOwnProperty("segment"))
                    $root.hydrosphere.onnx.TensorProto.Segment.encode(message.segment, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.floatData != null && message.floatData.length) {
                    writer.uint32(/* id 4, wireType 2 =*/34).fork();
                    for (var i = 0; i < message.floatData.length; ++i)
                        writer.float(message.floatData[i]);
                    writer.ldelim();
                }
                if (message.int32Data != null && message.int32Data.length) {
                    writer.uint32(/* id 5, wireType 2 =*/42).fork();
                    for (var i = 0; i < message.int32Data.length; ++i)
                        writer.int32(message.int32Data[i]);
                    writer.ldelim();
                }
                if (message.stringData != null && message.stringData.length)
                    for (var i = 0; i < message.stringData.length; ++i)
                        writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.stringData[i]);
                if (message.int64Data != null && message.int64Data.length) {
                    writer.uint32(/* id 7, wireType 2 =*/58).fork();
                    for (var i = 0; i < message.int64Data.length; ++i)
                        writer.int64(message.int64Data[i]);
                    writer.ldelim();
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.name);
                if (message.rawData != null && message.hasOwnProperty("rawData"))
                    writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.rawData);
                if (message.doubleData != null && message.doubleData.length) {
                    writer.uint32(/* id 10, wireType 2 =*/82).fork();
                    for (var i = 0; i < message.doubleData.length; ++i)
                        writer.double(message.doubleData[i]);
                    writer.ldelim();
                }
                if (message.uint64Data != null && message.uint64Data.length) {
                    writer.uint32(/* id 11, wireType 2 =*/90).fork();
                    for (var i = 0; i < message.uint64Data.length; ++i)
                        writer.uint64(message.uint64Data[i]);
                    writer.ldelim();
                }
                if (message.docString != null && message.hasOwnProperty("docString"))
                    writer.uint32(/* id 12, wireType 2 =*/98).string(message.docString);
                return writer;
            };

            /**
             * Encodes the specified TensorProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.TensorProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.TensorProto
             * @static
             * @param {hydrosphere.onnx.ITensorProto} message TensorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TensorProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TensorProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.TensorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.TensorProto} TensorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.TensorProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.dims && message.dims.length))
                            message.dims = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.dims.push(reader.int64());
                        } else
                            message.dims.push(reader.int64());
                        break;
                    case 2:
                        message.dataType = reader.int32();
                        break;
                    case 3:
                        message.segment = $root.hydrosphere.onnx.TensorProto.Segment.decode(reader, reader.uint32());
                        break;
                    case 4:
                        if (!(message.floatData && message.floatData.length))
                            message.floatData = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.floatData.push(reader.float());
                        } else
                            message.floatData.push(reader.float());
                        break;
                    case 5:
                        if (!(message.int32Data && message.int32Data.length))
                            message.int32Data = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.int32Data.push(reader.int32());
                        } else
                            message.int32Data.push(reader.int32());
                        break;
                    case 6:
                        if (!(message.stringData && message.stringData.length))
                            message.stringData = [];
                        message.stringData.push(reader.bytes());
                        break;
                    case 7:
                        if (!(message.int64Data && message.int64Data.length))
                            message.int64Data = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.int64Data.push(reader.int64());
                        } else
                            message.int64Data.push(reader.int64());
                        break;
                    case 8:
                        message.name = reader.string();
                        break;
                    case 12:
                        message.docString = reader.string();
                        break;
                    case 9:
                        message.rawData = reader.bytes();
                        break;
                    case 10:
                        if (!(message.doubleData && message.doubleData.length))
                            message.doubleData = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.doubleData.push(reader.double());
                        } else
                            message.doubleData.push(reader.double());
                        break;
                    case 11:
                        if (!(message.uint64Data && message.uint64Data.length))
                            message.uint64Data = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.uint64Data.push(reader.uint64());
                        } else
                            message.uint64Data.push(reader.uint64());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TensorProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.TensorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.TensorProto} TensorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TensorProto message.
             * @function verify
             * @memberof hydrosphere.onnx.TensorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TensorProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.dims != null && message.hasOwnProperty("dims")) {
                    if (!Array.isArray(message.dims))
                        return "dims: array expected";
                    for (var i = 0; i < message.dims.length; ++i)
                        if (!$util.isInteger(message.dims[i]) && !(message.dims[i] && $util.isInteger(message.dims[i].low) && $util.isInteger(message.dims[i].high)))
                            return "dims: integer|Long[] expected";
                }
                if (message.dataType != null && message.hasOwnProperty("dataType"))
                    switch (message.dataType) {
                    default:
                        return "dataType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        break;
                    }
                if (message.segment != null && message.hasOwnProperty("segment")) {
                    var error = $root.hydrosphere.onnx.TensorProto.Segment.verify(message.segment);
                    if (error)
                        return "segment." + error;
                }
                if (message.floatData != null && message.hasOwnProperty("floatData")) {
                    if (!Array.isArray(message.floatData))
                        return "floatData: array expected";
                    for (var i = 0; i < message.floatData.length; ++i)
                        if (typeof message.floatData[i] !== "number")
                            return "floatData: number[] expected";
                }
                if (message.int32Data != null && message.hasOwnProperty("int32Data")) {
                    if (!Array.isArray(message.int32Data))
                        return "int32Data: array expected";
                    for (var i = 0; i < message.int32Data.length; ++i)
                        if (!$util.isInteger(message.int32Data[i]))
                            return "int32Data: integer[] expected";
                }
                if (message.stringData != null && message.hasOwnProperty("stringData")) {
                    if (!Array.isArray(message.stringData))
                        return "stringData: array expected";
                    for (var i = 0; i < message.stringData.length; ++i)
                        if (!(message.stringData[i] && typeof message.stringData[i].length === "number" || $util.isString(message.stringData[i])))
                            return "stringData: buffer[] expected";
                }
                if (message.int64Data != null && message.hasOwnProperty("int64Data")) {
                    if (!Array.isArray(message.int64Data))
                        return "int64Data: array expected";
                    for (var i = 0; i < message.int64Data.length; ++i)
                        if (!$util.isInteger(message.int64Data[i]) && !(message.int64Data[i] && $util.isInteger(message.int64Data[i].low) && $util.isInteger(message.int64Data[i].high)))
                            return "int64Data: integer|Long[] expected";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.docString != null && message.hasOwnProperty("docString"))
                    if (!$util.isString(message.docString))
                        return "docString: string expected";
                if (message.rawData != null && message.hasOwnProperty("rawData"))
                    if (!(message.rawData && typeof message.rawData.length === "number" || $util.isString(message.rawData)))
                        return "rawData: buffer expected";
                if (message.doubleData != null && message.hasOwnProperty("doubleData")) {
                    if (!Array.isArray(message.doubleData))
                        return "doubleData: array expected";
                    for (var i = 0; i < message.doubleData.length; ++i)
                        if (typeof message.doubleData[i] !== "number")
                            return "doubleData: number[] expected";
                }
                if (message.uint64Data != null && message.hasOwnProperty("uint64Data")) {
                    if (!Array.isArray(message.uint64Data))
                        return "uint64Data: array expected";
                    for (var i = 0; i < message.uint64Data.length; ++i)
                        if (!$util.isInteger(message.uint64Data[i]) && !(message.uint64Data[i] && $util.isInteger(message.uint64Data[i].low) && $util.isInteger(message.uint64Data[i].high)))
                            return "uint64Data: integer|Long[] expected";
                }
                return null;
            };

            /**
             * Creates a TensorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.TensorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.TensorProto} TensorProto
             */
            TensorProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.TensorProto)
                    return object;
                var message = new $root.hydrosphere.onnx.TensorProto();
                if (object.dims) {
                    if (!Array.isArray(object.dims))
                        throw TypeError(".hydrosphere.onnx.TensorProto.dims: array expected");
                    message.dims = [];
                    for (var i = 0; i < object.dims.length; ++i)
                        if ($util.Long)
                            (message.dims[i] = $util.Long.fromValue(object.dims[i])).unsigned = false;
                        else if (typeof object.dims[i] === "string")
                            message.dims[i] = parseInt(object.dims[i], 10);
                        else if (typeof object.dims[i] === "number")
                            message.dims[i] = object.dims[i];
                        else if (typeof object.dims[i] === "object")
                            message.dims[i] = new $util.LongBits(object.dims[i].low >>> 0, object.dims[i].high >>> 0).toNumber();
                }
                switch (object.dataType) {
                case "UNDEFINED":
                case 0:
                    message.dataType = 0;
                    break;
                case "FLOAT":
                case 1:
                    message.dataType = 1;
                    break;
                case "UINT8":
                case 2:
                    message.dataType = 2;
                    break;
                case "INT8":
                case 3:
                    message.dataType = 3;
                    break;
                case "UINT16":
                case 4:
                    message.dataType = 4;
                    break;
                case "INT16":
                case 5:
                    message.dataType = 5;
                    break;
                case "INT32":
                case 6:
                    message.dataType = 6;
                    break;
                case "INT64":
                case 7:
                    message.dataType = 7;
                    break;
                case "STRING":
                case 8:
                    message.dataType = 8;
                    break;
                case "BOOL":
                case 9:
                    message.dataType = 9;
                    break;
                case "FLOAT16":
                case 10:
                    message.dataType = 10;
                    break;
                case "DOUBLE":
                case 11:
                    message.dataType = 11;
                    break;
                case "UINT32":
                case 12:
                    message.dataType = 12;
                    break;
                case "UINT64":
                case 13:
                    message.dataType = 13;
                    break;
                case "COMPLEX64":
                case 14:
                    message.dataType = 14;
                    break;
                case "COMPLEX128":
                case 15:
                    message.dataType = 15;
                    break;
                }
                if (object.segment != null) {
                    if (typeof object.segment !== "object")
                        throw TypeError(".hydrosphere.onnx.TensorProto.segment: object expected");
                    message.segment = $root.hydrosphere.onnx.TensorProto.Segment.fromObject(object.segment);
                }
                if (object.floatData) {
                    if (!Array.isArray(object.floatData))
                        throw TypeError(".hydrosphere.onnx.TensorProto.floatData: array expected");
                    message.floatData = [];
                    for (var i = 0; i < object.floatData.length; ++i)
                        message.floatData[i] = Number(object.floatData[i]);
                }
                if (object.int32Data) {
                    if (!Array.isArray(object.int32Data))
                        throw TypeError(".hydrosphere.onnx.TensorProto.int32Data: array expected");
                    message.int32Data = [];
                    for (var i = 0; i < object.int32Data.length; ++i)
                        message.int32Data[i] = object.int32Data[i] | 0;
                }
                if (object.stringData) {
                    if (!Array.isArray(object.stringData))
                        throw TypeError(".hydrosphere.onnx.TensorProto.stringData: array expected");
                    message.stringData = [];
                    for (var i = 0; i < object.stringData.length; ++i)
                        if (typeof object.stringData[i] === "string")
                            $util.base64.decode(object.stringData[i], message.stringData[i] = $util.newBuffer($util.base64.length(object.stringData[i])), 0);
                        else if (object.stringData[i].length)
                            message.stringData[i] = object.stringData[i];
                }
                if (object.int64Data) {
                    if (!Array.isArray(object.int64Data))
                        throw TypeError(".hydrosphere.onnx.TensorProto.int64Data: array expected");
                    message.int64Data = [];
                    for (var i = 0; i < object.int64Data.length; ++i)
                        if ($util.Long)
                            (message.int64Data[i] = $util.Long.fromValue(object.int64Data[i])).unsigned = false;
                        else if (typeof object.int64Data[i] === "string")
                            message.int64Data[i] = parseInt(object.int64Data[i], 10);
                        else if (typeof object.int64Data[i] === "number")
                            message.int64Data[i] = object.int64Data[i];
                        else if (typeof object.int64Data[i] === "object")
                            message.int64Data[i] = new $util.LongBits(object.int64Data[i].low >>> 0, object.int64Data[i].high >>> 0).toNumber();
                }
                if (object.name != null)
                    message.name = String(object.name);
                if (object.docString != null)
                    message.docString = String(object.docString);
                if (object.rawData != null)
                    if (typeof object.rawData === "string")
                        $util.base64.decode(object.rawData, message.rawData = $util.newBuffer($util.base64.length(object.rawData)), 0);
                    else if (object.rawData.length)
                        message.rawData = object.rawData;
                if (object.doubleData) {
                    if (!Array.isArray(object.doubleData))
                        throw TypeError(".hydrosphere.onnx.TensorProto.doubleData: array expected");
                    message.doubleData = [];
                    for (var i = 0; i < object.doubleData.length; ++i)
                        message.doubleData[i] = Number(object.doubleData[i]);
                }
                if (object.uint64Data) {
                    if (!Array.isArray(object.uint64Data))
                        throw TypeError(".hydrosphere.onnx.TensorProto.uint64Data: array expected");
                    message.uint64Data = [];
                    for (var i = 0; i < object.uint64Data.length; ++i)
                        if ($util.Long)
                            (message.uint64Data[i] = $util.Long.fromValue(object.uint64Data[i])).unsigned = true;
                        else if (typeof object.uint64Data[i] === "string")
                            message.uint64Data[i] = parseInt(object.uint64Data[i], 10);
                        else if (typeof object.uint64Data[i] === "number")
                            message.uint64Data[i] = object.uint64Data[i];
                        else if (typeof object.uint64Data[i] === "object")
                            message.uint64Data[i] = new $util.LongBits(object.uint64Data[i].low >>> 0, object.uint64Data[i].high >>> 0).toNumber(true);
                }
                return message;
            };

            /**
             * Creates a plain object from a TensorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.TensorProto
             * @static
             * @param {hydrosphere.onnx.TensorProto} message TensorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TensorProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.dims = [];
                    object.floatData = [];
                    object.int32Data = [];
                    object.stringData = [];
                    object.int64Data = [];
                    object.doubleData = [];
                    object.uint64Data = [];
                }
                if (options.defaults) {
                    object.dataType = options.enums === String ? "UNDEFINED" : 0;
                    object.segment = null;
                    object.name = "";
                    if (options.bytes === String)
                        object.rawData = "";
                    else {
                        object.rawData = [];
                        if (options.bytes !== Array)
                            object.rawData = $util.newBuffer(object.rawData);
                    }
                    object.docString = "";
                }
                if (message.dims && message.dims.length) {
                    object.dims = [];
                    for (var j = 0; j < message.dims.length; ++j)
                        if (typeof message.dims[j] === "number")
                            object.dims[j] = options.longs === String ? String(message.dims[j]) : message.dims[j];
                        else
                            object.dims[j] = options.longs === String ? $util.Long.prototype.toString.call(message.dims[j]) : options.longs === Number ? new $util.LongBits(message.dims[j].low >>> 0, message.dims[j].high >>> 0).toNumber() : message.dims[j];
                }
                if (message.dataType != null && message.hasOwnProperty("dataType"))
                    object.dataType = options.enums === String ? $root.hydrosphere.onnx.TensorProto.DataType[message.dataType] : message.dataType;
                if (message.segment != null && message.hasOwnProperty("segment"))
                    object.segment = $root.hydrosphere.onnx.TensorProto.Segment.toObject(message.segment, options);
                if (message.floatData && message.floatData.length) {
                    object.floatData = [];
                    for (var j = 0; j < message.floatData.length; ++j)
                        object.floatData[j] = options.json && !isFinite(message.floatData[j]) ? String(message.floatData[j]) : message.floatData[j];
                }
                if (message.int32Data && message.int32Data.length) {
                    object.int32Data = [];
                    for (var j = 0; j < message.int32Data.length; ++j)
                        object.int32Data[j] = message.int32Data[j];
                }
                if (message.stringData && message.stringData.length) {
                    object.stringData = [];
                    for (var j = 0; j < message.stringData.length; ++j)
                        object.stringData[j] = options.bytes === String ? $util.base64.encode(message.stringData[j], 0, message.stringData[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.stringData[j]) : message.stringData[j];
                }
                if (message.int64Data && message.int64Data.length) {
                    object.int64Data = [];
                    for (var j = 0; j < message.int64Data.length; ++j)
                        if (typeof message.int64Data[j] === "number")
                            object.int64Data[j] = options.longs === String ? String(message.int64Data[j]) : message.int64Data[j];
                        else
                            object.int64Data[j] = options.longs === String ? $util.Long.prototype.toString.call(message.int64Data[j]) : options.longs === Number ? new $util.LongBits(message.int64Data[j].low >>> 0, message.int64Data[j].high >>> 0).toNumber() : message.int64Data[j];
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.rawData != null && message.hasOwnProperty("rawData"))
                    object.rawData = options.bytes === String ? $util.base64.encode(message.rawData, 0, message.rawData.length) : options.bytes === Array ? Array.prototype.slice.call(message.rawData) : message.rawData;
                if (message.doubleData && message.doubleData.length) {
                    object.doubleData = [];
                    for (var j = 0; j < message.doubleData.length; ++j)
                        object.doubleData[j] = options.json && !isFinite(message.doubleData[j]) ? String(message.doubleData[j]) : message.doubleData[j];
                }
                if (message.uint64Data && message.uint64Data.length) {
                    object.uint64Data = [];
                    for (var j = 0; j < message.uint64Data.length; ++j)
                        if (typeof message.uint64Data[j] === "number")
                            object.uint64Data[j] = options.longs === String ? String(message.uint64Data[j]) : message.uint64Data[j];
                        else
                            object.uint64Data[j] = options.longs === String ? $util.Long.prototype.toString.call(message.uint64Data[j]) : options.longs === Number ? new $util.LongBits(message.uint64Data[j].low >>> 0, message.uint64Data[j].high >>> 0).toNumber(true) : message.uint64Data[j];
                }
                if (message.docString != null && message.hasOwnProperty("docString"))
                    object.docString = message.docString;
                return object;
            };

            /**
             * Converts this TensorProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.TensorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TensorProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * DataType enum.
             * @name hydrosphere.onnx.TensorProto.DataType
             * @enum {string}
             * @property {number} UNDEFINED=0 UNDEFINED value
             * @property {number} FLOAT=1 FLOAT value
             * @property {number} UINT8=2 UINT8 value
             * @property {number} INT8=3 INT8 value
             * @property {number} UINT16=4 UINT16 value
             * @property {number} INT16=5 INT16 value
             * @property {number} INT32=6 INT32 value
             * @property {number} INT64=7 INT64 value
             * @property {number} STRING=8 STRING value
             * @property {number} BOOL=9 BOOL value
             * @property {number} FLOAT16=10 FLOAT16 value
             * @property {number} DOUBLE=11 DOUBLE value
             * @property {number} UINT32=12 UINT32 value
             * @property {number} UINT64=13 UINT64 value
             * @property {number} COMPLEX64=14 COMPLEX64 value
             * @property {number} COMPLEX128=15 COMPLEX128 value
             */
            TensorProto.DataType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNDEFINED"] = 0;
                values[valuesById[1] = "FLOAT"] = 1;
                values[valuesById[2] = "UINT8"] = 2;
                values[valuesById[3] = "INT8"] = 3;
                values[valuesById[4] = "UINT16"] = 4;
                values[valuesById[5] = "INT16"] = 5;
                values[valuesById[6] = "INT32"] = 6;
                values[valuesById[7] = "INT64"] = 7;
                values[valuesById[8] = "STRING"] = 8;
                values[valuesById[9] = "BOOL"] = 9;
                values[valuesById[10] = "FLOAT16"] = 10;
                values[valuesById[11] = "DOUBLE"] = 11;
                values[valuesById[12] = "UINT32"] = 12;
                values[valuesById[13] = "UINT64"] = 13;
                values[valuesById[14] = "COMPLEX64"] = 14;
                values[valuesById[15] = "COMPLEX128"] = 15;
                return values;
            })();

            TensorProto.Segment = (function() {

                /**
                 * Properties of a Segment.
                 * @memberof hydrosphere.onnx.TensorProto
                 * @interface ISegment
                 * @property {number|Long|null} [begin] Segment begin
                 * @property {number|Long|null} [end] Segment end
                 */

                /**
                 * Constructs a new Segment.
                 * @memberof hydrosphere.onnx.TensorProto
                 * @classdesc Represents a Segment.
                 * @implements ISegment
                 * @constructor
                 * @param {hydrosphere.onnx.TensorProto.ISegment=} [properties] Properties to set
                 */
                function Segment(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Segment begin.
                 * @member {number|Long} begin
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @instance
                 */
                Segment.prototype.begin = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Segment end.
                 * @member {number|Long} end
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @instance
                 */
                Segment.prototype.end = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new Segment instance using the specified properties.
                 * @function create
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @static
                 * @param {hydrosphere.onnx.TensorProto.ISegment=} [properties] Properties to set
                 * @returns {hydrosphere.onnx.TensorProto.Segment} Segment instance
                 */
                Segment.create = function create(properties) {
                    return new Segment(properties);
                };

                /**
                 * Encodes the specified Segment message. Does not implicitly {@link hydrosphere.onnx.TensorProto.Segment.verify|verify} messages.
                 * @function encode
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @static
                 * @param {hydrosphere.onnx.TensorProto.ISegment} message Segment message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Segment.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.begin != null && message.hasOwnProperty("begin"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.begin);
                    if (message.end != null && message.hasOwnProperty("end"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int64(message.end);
                    return writer;
                };

                /**
                 * Encodes the specified Segment message, length delimited. Does not implicitly {@link hydrosphere.onnx.TensorProto.Segment.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @static
                 * @param {hydrosphere.onnx.TensorProto.ISegment} message Segment message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Segment.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Segment message from the specified reader or buffer.
                 * @function decode
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hydrosphere.onnx.TensorProto.Segment} Segment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Segment.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.TensorProto.Segment();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.begin = reader.int64();
                            break;
                        case 2:
                            message.end = reader.int64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Segment message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hydrosphere.onnx.TensorProto.Segment} Segment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Segment.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Segment message.
                 * @function verify
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Segment.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.begin != null && message.hasOwnProperty("begin"))
                        if (!$util.isInteger(message.begin) && !(message.begin && $util.isInteger(message.begin.low) && $util.isInteger(message.begin.high)))
                            return "begin: integer|Long expected";
                    if (message.end != null && message.hasOwnProperty("end"))
                        if (!$util.isInteger(message.end) && !(message.end && $util.isInteger(message.end.low) && $util.isInteger(message.end.high)))
                            return "end: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a Segment message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hydrosphere.onnx.TensorProto.Segment} Segment
                 */
                Segment.fromObject = function fromObject(object) {
                    if (object instanceof $root.hydrosphere.onnx.TensorProto.Segment)
                        return object;
                    var message = new $root.hydrosphere.onnx.TensorProto.Segment();
                    if (object.begin != null)
                        if ($util.Long)
                            (message.begin = $util.Long.fromValue(object.begin)).unsigned = false;
                        else if (typeof object.begin === "string")
                            message.begin = parseInt(object.begin, 10);
                        else if (typeof object.begin === "number")
                            message.begin = object.begin;
                        else if (typeof object.begin === "object")
                            message.begin = new $util.LongBits(object.begin.low >>> 0, object.begin.high >>> 0).toNumber();
                    if (object.end != null)
                        if ($util.Long)
                            (message.end = $util.Long.fromValue(object.end)).unsigned = false;
                        else if (typeof object.end === "string")
                            message.end = parseInt(object.end, 10);
                        else if (typeof object.end === "number")
                            message.end = object.end;
                        else if (typeof object.end === "object")
                            message.end = new $util.LongBits(object.end.low >>> 0, object.end.high >>> 0).toNumber();
                    return message;
                };

                /**
                 * Creates a plain object from a Segment message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @static
                 * @param {hydrosphere.onnx.TensorProto.Segment} message Segment
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Segment.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.begin = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.begin = options.longs === String ? "0" : 0;
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.end = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.end = options.longs === String ? "0" : 0;
                    }
                    if (message.begin != null && message.hasOwnProperty("begin"))
                        if (typeof message.begin === "number")
                            object.begin = options.longs === String ? String(message.begin) : message.begin;
                        else
                            object.begin = options.longs === String ? $util.Long.prototype.toString.call(message.begin) : options.longs === Number ? new $util.LongBits(message.begin.low >>> 0, message.begin.high >>> 0).toNumber() : message.begin;
                    if (message.end != null && message.hasOwnProperty("end"))
                        if (typeof message.end === "number")
                            object.end = options.longs === String ? String(message.end) : message.end;
                        else
                            object.end = options.longs === String ? $util.Long.prototype.toString.call(message.end) : options.longs === Number ? new $util.LongBits(message.end.low >>> 0, message.end.high >>> 0).toNumber() : message.end;
                    return object;
                };

                /**
                 * Converts this Segment to JSON.
                 * @function toJSON
                 * @memberof hydrosphere.onnx.TensorProto.Segment
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Segment.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Segment;
            })();

            return TensorProto;
        })();

        onnx.TensorShapeProto = (function() {

            /**
             * Properties of a TensorShapeProto.
             * @memberof hydrosphere.onnx
             * @interface ITensorShapeProto
             * @property {Array.<hydrosphere.onnx.TensorShapeProto.IDimension>|null} [dim] TensorShapeProto dim
             */

            /**
             * Constructs a new TensorShapeProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents a TensorShapeProto.
             * @implements ITensorShapeProto
             * @constructor
             * @param {hydrosphere.onnx.ITensorShapeProto=} [properties] Properties to set
             */
            function TensorShapeProto(properties) {
                this.dim = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TensorShapeProto dim.
             * @member {Array.<hydrosphere.onnx.TensorShapeProto.IDimension>} dim
             * @memberof hydrosphere.onnx.TensorShapeProto
             * @instance
             */
            TensorShapeProto.prototype.dim = $util.emptyArray;

            /**
             * Creates a new TensorShapeProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.TensorShapeProto
             * @static
             * @param {hydrosphere.onnx.ITensorShapeProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.TensorShapeProto} TensorShapeProto instance
             */
            TensorShapeProto.create = function create(properties) {
                return new TensorShapeProto(properties);
            };

            /**
             * Encodes the specified TensorShapeProto message. Does not implicitly {@link hydrosphere.onnx.TensorShapeProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.TensorShapeProto
             * @static
             * @param {hydrosphere.onnx.ITensorShapeProto} message TensorShapeProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TensorShapeProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.dim != null && message.dim.length)
                    for (var i = 0; i < message.dim.length; ++i)
                        $root.hydrosphere.onnx.TensorShapeProto.Dimension.encode(message.dim[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TensorShapeProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.TensorShapeProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.TensorShapeProto
             * @static
             * @param {hydrosphere.onnx.ITensorShapeProto} message TensorShapeProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TensorShapeProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TensorShapeProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.TensorShapeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.TensorShapeProto} TensorShapeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorShapeProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.TensorShapeProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.dim && message.dim.length))
                            message.dim = [];
                        message.dim.push($root.hydrosphere.onnx.TensorShapeProto.Dimension.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TensorShapeProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.TensorShapeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.TensorShapeProto} TensorShapeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TensorShapeProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TensorShapeProto message.
             * @function verify
             * @memberof hydrosphere.onnx.TensorShapeProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TensorShapeProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.dim != null && message.hasOwnProperty("dim")) {
                    if (!Array.isArray(message.dim))
                        return "dim: array expected";
                    for (var i = 0; i < message.dim.length; ++i) {
                        var error = $root.hydrosphere.onnx.TensorShapeProto.Dimension.verify(message.dim[i]);
                        if (error)
                            return "dim." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a TensorShapeProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.TensorShapeProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.TensorShapeProto} TensorShapeProto
             */
            TensorShapeProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.TensorShapeProto)
                    return object;
                var message = new $root.hydrosphere.onnx.TensorShapeProto();
                if (object.dim) {
                    if (!Array.isArray(object.dim))
                        throw TypeError(".hydrosphere.onnx.TensorShapeProto.dim: array expected");
                    message.dim = [];
                    for (var i = 0; i < object.dim.length; ++i) {
                        if (typeof object.dim[i] !== "object")
                            throw TypeError(".hydrosphere.onnx.TensorShapeProto.dim: object expected");
                        message.dim[i] = $root.hydrosphere.onnx.TensorShapeProto.Dimension.fromObject(object.dim[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a TensorShapeProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.TensorShapeProto
             * @static
             * @param {hydrosphere.onnx.TensorShapeProto} message TensorShapeProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TensorShapeProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.dim = [];
                if (message.dim && message.dim.length) {
                    object.dim = [];
                    for (var j = 0; j < message.dim.length; ++j)
                        object.dim[j] = $root.hydrosphere.onnx.TensorShapeProto.Dimension.toObject(message.dim[j], options);
                }
                return object;
            };

            /**
             * Converts this TensorShapeProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.TensorShapeProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TensorShapeProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            TensorShapeProto.Dimension = (function() {

                /**
                 * Properties of a Dimension.
                 * @memberof hydrosphere.onnx.TensorShapeProto
                 * @interface IDimension
                 * @property {number|Long|null} [dimValue] Dimension dimValue
                 * @property {string|null} [dimParam] Dimension dimParam
                 * @property {string|null} [denotation] Dimension denotation
                 */

                /**
                 * Constructs a new Dimension.
                 * @memberof hydrosphere.onnx.TensorShapeProto
                 * @classdesc Represents a Dimension.
                 * @implements IDimension
                 * @constructor
                 * @param {hydrosphere.onnx.TensorShapeProto.IDimension=} [properties] Properties to set
                 */
                function Dimension(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Dimension dimValue.
                 * @member {number|Long} dimValue
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @instance
                 */
                Dimension.prototype.dimValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Dimension dimParam.
                 * @member {string} dimParam
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @instance
                 */
                Dimension.prototype.dimParam = "";

                /**
                 * Dimension denotation.
                 * @member {string} denotation
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @instance
                 */
                Dimension.prototype.denotation = "";

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Dimension value.
                 * @member {"dimValue"|"dimParam"|undefined} value
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @instance
                 */
                Object.defineProperty(Dimension.prototype, "value", {
                    get: $util.oneOfGetter($oneOfFields = ["dimValue", "dimParam"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new Dimension instance using the specified properties.
                 * @function create
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @static
                 * @param {hydrosphere.onnx.TensorShapeProto.IDimension=} [properties] Properties to set
                 * @returns {hydrosphere.onnx.TensorShapeProto.Dimension} Dimension instance
                 */
                Dimension.create = function create(properties) {
                    return new Dimension(properties);
                };

                /**
                 * Encodes the specified Dimension message. Does not implicitly {@link hydrosphere.onnx.TensorShapeProto.Dimension.verify|verify} messages.
                 * @function encode
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @static
                 * @param {hydrosphere.onnx.TensorShapeProto.IDimension} message Dimension message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Dimension.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.dimValue != null && message.hasOwnProperty("dimValue"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.dimValue);
                    if (message.dimParam != null && message.hasOwnProperty("dimParam"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.dimParam);
                    if (message.denotation != null && message.hasOwnProperty("denotation"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.denotation);
                    return writer;
                };

                /**
                 * Encodes the specified Dimension message, length delimited. Does not implicitly {@link hydrosphere.onnx.TensorShapeProto.Dimension.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @static
                 * @param {hydrosphere.onnx.TensorShapeProto.IDimension} message Dimension message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Dimension.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Dimension message from the specified reader or buffer.
                 * @function decode
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hydrosphere.onnx.TensorShapeProto.Dimension} Dimension
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Dimension.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.TensorShapeProto.Dimension();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.dimValue = reader.int64();
                            break;
                        case 2:
                            message.dimParam = reader.string();
                            break;
                        case 3:
                            message.denotation = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Dimension message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hydrosphere.onnx.TensorShapeProto.Dimension} Dimension
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Dimension.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Dimension message.
                 * @function verify
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Dimension.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.dimValue != null && message.hasOwnProperty("dimValue")) {
                        properties.value = 1;
                        if (!$util.isInteger(message.dimValue) && !(message.dimValue && $util.isInteger(message.dimValue.low) && $util.isInteger(message.dimValue.high)))
                            return "dimValue: integer|Long expected";
                    }
                    if (message.dimParam != null && message.hasOwnProperty("dimParam")) {
                        if (properties.value === 1)
                            return "value: multiple values";
                        properties.value = 1;
                        if (!$util.isString(message.dimParam))
                            return "dimParam: string expected";
                    }
                    if (message.denotation != null && message.hasOwnProperty("denotation"))
                        if (!$util.isString(message.denotation))
                            return "denotation: string expected";
                    return null;
                };

                /**
                 * Creates a Dimension message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hydrosphere.onnx.TensorShapeProto.Dimension} Dimension
                 */
                Dimension.fromObject = function fromObject(object) {
                    if (object instanceof $root.hydrosphere.onnx.TensorShapeProto.Dimension)
                        return object;
                    var message = new $root.hydrosphere.onnx.TensorShapeProto.Dimension();
                    if (object.dimValue != null)
                        if ($util.Long)
                            (message.dimValue = $util.Long.fromValue(object.dimValue)).unsigned = false;
                        else if (typeof object.dimValue === "string")
                            message.dimValue = parseInt(object.dimValue, 10);
                        else if (typeof object.dimValue === "number")
                            message.dimValue = object.dimValue;
                        else if (typeof object.dimValue === "object")
                            message.dimValue = new $util.LongBits(object.dimValue.low >>> 0, object.dimValue.high >>> 0).toNumber();
                    if (object.dimParam != null)
                        message.dimParam = String(object.dimParam);
                    if (object.denotation != null)
                        message.denotation = String(object.denotation);
                    return message;
                };

                /**
                 * Creates a plain object from a Dimension message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @static
                 * @param {hydrosphere.onnx.TensorShapeProto.Dimension} message Dimension
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Dimension.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.denotation = "";
                    if (message.dimValue != null && message.hasOwnProperty("dimValue")) {
                        if (typeof message.dimValue === "number")
                            object.dimValue = options.longs === String ? String(message.dimValue) : message.dimValue;
                        else
                            object.dimValue = options.longs === String ? $util.Long.prototype.toString.call(message.dimValue) : options.longs === Number ? new $util.LongBits(message.dimValue.low >>> 0, message.dimValue.high >>> 0).toNumber() : message.dimValue;
                        if (options.oneofs)
                            object.value = "dimValue";
                    }
                    if (message.dimParam != null && message.hasOwnProperty("dimParam")) {
                        object.dimParam = message.dimParam;
                        if (options.oneofs)
                            object.value = "dimParam";
                    }
                    if (message.denotation != null && message.hasOwnProperty("denotation"))
                        object.denotation = message.denotation;
                    return object;
                };

                /**
                 * Converts this Dimension to JSON.
                 * @function toJSON
                 * @memberof hydrosphere.onnx.TensorShapeProto.Dimension
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Dimension.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Dimension;
            })();

            return TensorShapeProto;
        })();

        onnx.DenotationConstProto = (function() {

            /**
             * Properties of a DenotationConstProto.
             * @memberof hydrosphere.onnx
             * @interface IDenotationConstProto
             * @property {string|null} [DATA_BATCH] DenotationConstProto DATA_BATCH
             * @property {string|null} [DATA_CHANNEL] DenotationConstProto DATA_CHANNEL
             * @property {string|null} [DATA_TIME] DenotationConstProto DATA_TIME
             * @property {string|null} [DATA_FEATURE] DenotationConstProto DATA_FEATURE
             * @property {string|null} [FILTER_IN_CHANNEL] DenotationConstProto FILTER_IN_CHANNEL
             * @property {string|null} [FILTER_OUT_CHANNEL] DenotationConstProto FILTER_OUT_CHANNEL
             * @property {string|null} [FILTER_SPATIAL] DenotationConstProto FILTER_SPATIAL
             */

            /**
             * Constructs a new DenotationConstProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents a DenotationConstProto.
             * @implements IDenotationConstProto
             * @constructor
             * @param {hydrosphere.onnx.IDenotationConstProto=} [properties] Properties to set
             */
            function DenotationConstProto(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DenotationConstProto DATA_BATCH.
             * @member {string} DATA_BATCH
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @instance
             */
            DenotationConstProto.prototype.DATA_BATCH = "";

            /**
             * DenotationConstProto DATA_CHANNEL.
             * @member {string} DATA_CHANNEL
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @instance
             */
            DenotationConstProto.prototype.DATA_CHANNEL = "";

            /**
             * DenotationConstProto DATA_TIME.
             * @member {string} DATA_TIME
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @instance
             */
            DenotationConstProto.prototype.DATA_TIME = "";

            /**
             * DenotationConstProto DATA_FEATURE.
             * @member {string} DATA_FEATURE
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @instance
             */
            DenotationConstProto.prototype.DATA_FEATURE = "";

            /**
             * DenotationConstProto FILTER_IN_CHANNEL.
             * @member {string} FILTER_IN_CHANNEL
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @instance
             */
            DenotationConstProto.prototype.FILTER_IN_CHANNEL = "";

            /**
             * DenotationConstProto FILTER_OUT_CHANNEL.
             * @member {string} FILTER_OUT_CHANNEL
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @instance
             */
            DenotationConstProto.prototype.FILTER_OUT_CHANNEL = "";

            /**
             * DenotationConstProto FILTER_SPATIAL.
             * @member {string} FILTER_SPATIAL
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @instance
             */
            DenotationConstProto.prototype.FILTER_SPATIAL = "";

            /**
             * Creates a new DenotationConstProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @static
             * @param {hydrosphere.onnx.IDenotationConstProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.DenotationConstProto} DenotationConstProto instance
             */
            DenotationConstProto.create = function create(properties) {
                return new DenotationConstProto(properties);
            };

            /**
             * Encodes the specified DenotationConstProto message. Does not implicitly {@link hydrosphere.onnx.DenotationConstProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @static
             * @param {hydrosphere.onnx.IDenotationConstProto} message DenotationConstProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DenotationConstProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.DATA_BATCH != null && message.hasOwnProperty("DATA_BATCH"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.DATA_BATCH);
                if (message.DATA_CHANNEL != null && message.hasOwnProperty("DATA_CHANNEL"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.DATA_CHANNEL);
                if (message.DATA_TIME != null && message.hasOwnProperty("DATA_TIME"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.DATA_TIME);
                if (message.DATA_FEATURE != null && message.hasOwnProperty("DATA_FEATURE"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.DATA_FEATURE);
                if (message.FILTER_IN_CHANNEL != null && message.hasOwnProperty("FILTER_IN_CHANNEL"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.FILTER_IN_CHANNEL);
                if (message.FILTER_OUT_CHANNEL != null && message.hasOwnProperty("FILTER_OUT_CHANNEL"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.FILTER_OUT_CHANNEL);
                if (message.FILTER_SPATIAL != null && message.hasOwnProperty("FILTER_SPATIAL"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.FILTER_SPATIAL);
                return writer;
            };

            /**
             * Encodes the specified DenotationConstProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.DenotationConstProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @static
             * @param {hydrosphere.onnx.IDenotationConstProto} message DenotationConstProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DenotationConstProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DenotationConstProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.DenotationConstProto} DenotationConstProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DenotationConstProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.DenotationConstProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.DATA_BATCH = reader.string();
                        break;
                    case 2:
                        message.DATA_CHANNEL = reader.string();
                        break;
                    case 3:
                        message.DATA_TIME = reader.string();
                        break;
                    case 4:
                        message.DATA_FEATURE = reader.string();
                        break;
                    case 5:
                        message.FILTER_IN_CHANNEL = reader.string();
                        break;
                    case 6:
                        message.FILTER_OUT_CHANNEL = reader.string();
                        break;
                    case 7:
                        message.FILTER_SPATIAL = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DenotationConstProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.DenotationConstProto} DenotationConstProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DenotationConstProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DenotationConstProto message.
             * @function verify
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DenotationConstProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.DATA_BATCH != null && message.hasOwnProperty("DATA_BATCH"))
                    if (!$util.isString(message.DATA_BATCH))
                        return "DATA_BATCH: string expected";
                if (message.DATA_CHANNEL != null && message.hasOwnProperty("DATA_CHANNEL"))
                    if (!$util.isString(message.DATA_CHANNEL))
                        return "DATA_CHANNEL: string expected";
                if (message.DATA_TIME != null && message.hasOwnProperty("DATA_TIME"))
                    if (!$util.isString(message.DATA_TIME))
                        return "DATA_TIME: string expected";
                if (message.DATA_FEATURE != null && message.hasOwnProperty("DATA_FEATURE"))
                    if (!$util.isString(message.DATA_FEATURE))
                        return "DATA_FEATURE: string expected";
                if (message.FILTER_IN_CHANNEL != null && message.hasOwnProperty("FILTER_IN_CHANNEL"))
                    if (!$util.isString(message.FILTER_IN_CHANNEL))
                        return "FILTER_IN_CHANNEL: string expected";
                if (message.FILTER_OUT_CHANNEL != null && message.hasOwnProperty("FILTER_OUT_CHANNEL"))
                    if (!$util.isString(message.FILTER_OUT_CHANNEL))
                        return "FILTER_OUT_CHANNEL: string expected";
                if (message.FILTER_SPATIAL != null && message.hasOwnProperty("FILTER_SPATIAL"))
                    if (!$util.isString(message.FILTER_SPATIAL))
                        return "FILTER_SPATIAL: string expected";
                return null;
            };

            /**
             * Creates a DenotationConstProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.DenotationConstProto} DenotationConstProto
             */
            DenotationConstProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.DenotationConstProto)
                    return object;
                var message = new $root.hydrosphere.onnx.DenotationConstProto();
                if (object.DATA_BATCH != null)
                    message.DATA_BATCH = String(object.DATA_BATCH);
                if (object.DATA_CHANNEL != null)
                    message.DATA_CHANNEL = String(object.DATA_CHANNEL);
                if (object.DATA_TIME != null)
                    message.DATA_TIME = String(object.DATA_TIME);
                if (object.DATA_FEATURE != null)
                    message.DATA_FEATURE = String(object.DATA_FEATURE);
                if (object.FILTER_IN_CHANNEL != null)
                    message.FILTER_IN_CHANNEL = String(object.FILTER_IN_CHANNEL);
                if (object.FILTER_OUT_CHANNEL != null)
                    message.FILTER_OUT_CHANNEL = String(object.FILTER_OUT_CHANNEL);
                if (object.FILTER_SPATIAL != null)
                    message.FILTER_SPATIAL = String(object.FILTER_SPATIAL);
                return message;
            };

            /**
             * Creates a plain object from a DenotationConstProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @static
             * @param {hydrosphere.onnx.DenotationConstProto} message DenotationConstProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DenotationConstProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.DATA_BATCH = "";
                    object.DATA_CHANNEL = "";
                    object.DATA_TIME = "";
                    object.DATA_FEATURE = "";
                    object.FILTER_IN_CHANNEL = "";
                    object.FILTER_OUT_CHANNEL = "";
                    object.FILTER_SPATIAL = "";
                }
                if (message.DATA_BATCH != null && message.hasOwnProperty("DATA_BATCH"))
                    object.DATA_BATCH = message.DATA_BATCH;
                if (message.DATA_CHANNEL != null && message.hasOwnProperty("DATA_CHANNEL"))
                    object.DATA_CHANNEL = message.DATA_CHANNEL;
                if (message.DATA_TIME != null && message.hasOwnProperty("DATA_TIME"))
                    object.DATA_TIME = message.DATA_TIME;
                if (message.DATA_FEATURE != null && message.hasOwnProperty("DATA_FEATURE"))
                    object.DATA_FEATURE = message.DATA_FEATURE;
                if (message.FILTER_IN_CHANNEL != null && message.hasOwnProperty("FILTER_IN_CHANNEL"))
                    object.FILTER_IN_CHANNEL = message.FILTER_IN_CHANNEL;
                if (message.FILTER_OUT_CHANNEL != null && message.hasOwnProperty("FILTER_OUT_CHANNEL"))
                    object.FILTER_OUT_CHANNEL = message.FILTER_OUT_CHANNEL;
                if (message.FILTER_SPATIAL != null && message.hasOwnProperty("FILTER_SPATIAL"))
                    object.FILTER_SPATIAL = message.FILTER_SPATIAL;
                return object;
            };

            /**
             * Converts this DenotationConstProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.DenotationConstProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DenotationConstProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DenotationConstProto;
        })();

        onnx.TypeProto = (function() {

            /**
             * Properties of a TypeProto.
             * @memberof hydrosphere.onnx
             * @interface ITypeProto
             * @property {hydrosphere.onnx.TypeProto.ITensor|null} [tensorType] TypeProto tensorType
             */

            /**
             * Constructs a new TypeProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents a TypeProto.
             * @implements ITypeProto
             * @constructor
             * @param {hydrosphere.onnx.ITypeProto=} [properties] Properties to set
             */
            function TypeProto(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TypeProto tensorType.
             * @member {hydrosphere.onnx.TypeProto.ITensor|null|undefined} tensorType
             * @memberof hydrosphere.onnx.TypeProto
             * @instance
             */
            TypeProto.prototype.tensorType = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * TypeProto value.
             * @member {"tensorType"|undefined} value
             * @memberof hydrosphere.onnx.TypeProto
             * @instance
             */
            Object.defineProperty(TypeProto.prototype, "value", {
                get: $util.oneOfGetter($oneOfFields = ["tensorType"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new TypeProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.TypeProto
             * @static
             * @param {hydrosphere.onnx.ITypeProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.TypeProto} TypeProto instance
             */
            TypeProto.create = function create(properties) {
                return new TypeProto(properties);
            };

            /**
             * Encodes the specified TypeProto message. Does not implicitly {@link hydrosphere.onnx.TypeProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.TypeProto
             * @static
             * @param {hydrosphere.onnx.ITypeProto} message TypeProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TypeProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.tensorType != null && message.hasOwnProperty("tensorType"))
                    $root.hydrosphere.onnx.TypeProto.Tensor.encode(message.tensorType, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TypeProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.TypeProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.TypeProto
             * @static
             * @param {hydrosphere.onnx.ITypeProto} message TypeProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TypeProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TypeProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.TypeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.TypeProto} TypeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TypeProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.TypeProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.tensorType = $root.hydrosphere.onnx.TypeProto.Tensor.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TypeProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.TypeProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.TypeProto} TypeProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TypeProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TypeProto message.
             * @function verify
             * @memberof hydrosphere.onnx.TypeProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TypeProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.tensorType != null && message.hasOwnProperty("tensorType")) {
                    properties.value = 1;
                    {
                        var error = $root.hydrosphere.onnx.TypeProto.Tensor.verify(message.tensorType);
                        if (error)
                            return "tensorType." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a TypeProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.TypeProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.TypeProto} TypeProto
             */
            TypeProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.TypeProto)
                    return object;
                var message = new $root.hydrosphere.onnx.TypeProto();
                if (object.tensorType != null) {
                    if (typeof object.tensorType !== "object")
                        throw TypeError(".hydrosphere.onnx.TypeProto.tensorType: object expected");
                    message.tensorType = $root.hydrosphere.onnx.TypeProto.Tensor.fromObject(object.tensorType);
                }
                return message;
            };

            /**
             * Creates a plain object from a TypeProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.TypeProto
             * @static
             * @param {hydrosphere.onnx.TypeProto} message TypeProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TypeProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.tensorType != null && message.hasOwnProperty("tensorType")) {
                    object.tensorType = $root.hydrosphere.onnx.TypeProto.Tensor.toObject(message.tensorType, options);
                    if (options.oneofs)
                        object.value = "tensorType";
                }
                return object;
            };

            /**
             * Converts this TypeProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.TypeProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TypeProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            TypeProto.Tensor = (function() {

                /**
                 * Properties of a Tensor.
                 * @memberof hydrosphere.onnx.TypeProto
                 * @interface ITensor
                 * @property {hydrosphere.onnx.TensorProto.DataType|null} [elemType] Tensor elemType
                 * @property {hydrosphere.onnx.ITensorShapeProto|null} [shape] Tensor shape
                 */

                /**
                 * Constructs a new Tensor.
                 * @memberof hydrosphere.onnx.TypeProto
                 * @classdesc Represents a Tensor.
                 * @implements ITensor
                 * @constructor
                 * @param {hydrosphere.onnx.TypeProto.ITensor=} [properties] Properties to set
                 */
                function Tensor(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Tensor elemType.
                 * @member {hydrosphere.onnx.TensorProto.DataType} elemType
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @instance
                 */
                Tensor.prototype.elemType = 0;

                /**
                 * Tensor shape.
                 * @member {hydrosphere.onnx.ITensorShapeProto|null|undefined} shape
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @instance
                 */
                Tensor.prototype.shape = null;

                /**
                 * Creates a new Tensor instance using the specified properties.
                 * @function create
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @static
                 * @param {hydrosphere.onnx.TypeProto.ITensor=} [properties] Properties to set
                 * @returns {hydrosphere.onnx.TypeProto.Tensor} Tensor instance
                 */
                Tensor.create = function create(properties) {
                    return new Tensor(properties);
                };

                /**
                 * Encodes the specified Tensor message. Does not implicitly {@link hydrosphere.onnx.TypeProto.Tensor.verify|verify} messages.
                 * @function encode
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @static
                 * @param {hydrosphere.onnx.TypeProto.ITensor} message Tensor message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Tensor.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.elemType != null && message.hasOwnProperty("elemType"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.elemType);
                    if (message.shape != null && message.hasOwnProperty("shape"))
                        $root.hydrosphere.onnx.TensorShapeProto.encode(message.shape, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Tensor message, length delimited. Does not implicitly {@link hydrosphere.onnx.TypeProto.Tensor.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @static
                 * @param {hydrosphere.onnx.TypeProto.ITensor} message Tensor message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Tensor.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Tensor message from the specified reader or buffer.
                 * @function decode
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hydrosphere.onnx.TypeProto.Tensor} Tensor
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Tensor.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.TypeProto.Tensor();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.elemType = reader.int32();
                            break;
                        case 2:
                            message.shape = $root.hydrosphere.onnx.TensorShapeProto.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Tensor message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hydrosphere.onnx.TypeProto.Tensor} Tensor
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Tensor.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Tensor message.
                 * @function verify
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Tensor.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.elemType != null && message.hasOwnProperty("elemType"))
                        switch (message.elemType) {
                        default:
                            return "elemType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                            break;
                        }
                    if (message.shape != null && message.hasOwnProperty("shape")) {
                        var error = $root.hydrosphere.onnx.TensorShapeProto.verify(message.shape);
                        if (error)
                            return "shape." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Tensor message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hydrosphere.onnx.TypeProto.Tensor} Tensor
                 */
                Tensor.fromObject = function fromObject(object) {
                    if (object instanceof $root.hydrosphere.onnx.TypeProto.Tensor)
                        return object;
                    var message = new $root.hydrosphere.onnx.TypeProto.Tensor();
                    switch (object.elemType) {
                    case "UNDEFINED":
                    case 0:
                        message.elemType = 0;
                        break;
                    case "FLOAT":
                    case 1:
                        message.elemType = 1;
                        break;
                    case "UINT8":
                    case 2:
                        message.elemType = 2;
                        break;
                    case "INT8":
                    case 3:
                        message.elemType = 3;
                        break;
                    case "UINT16":
                    case 4:
                        message.elemType = 4;
                        break;
                    case "INT16":
                    case 5:
                        message.elemType = 5;
                        break;
                    case "INT32":
                    case 6:
                        message.elemType = 6;
                        break;
                    case "INT64":
                    case 7:
                        message.elemType = 7;
                        break;
                    case "STRING":
                    case 8:
                        message.elemType = 8;
                        break;
                    case "BOOL":
                    case 9:
                        message.elemType = 9;
                        break;
                    case "FLOAT16":
                    case 10:
                        message.elemType = 10;
                        break;
                    case "DOUBLE":
                    case 11:
                        message.elemType = 11;
                        break;
                    case "UINT32":
                    case 12:
                        message.elemType = 12;
                        break;
                    case "UINT64":
                    case 13:
                        message.elemType = 13;
                        break;
                    case "COMPLEX64":
                    case 14:
                        message.elemType = 14;
                        break;
                    case "COMPLEX128":
                    case 15:
                        message.elemType = 15;
                        break;
                    }
                    if (object.shape != null) {
                        if (typeof object.shape !== "object")
                            throw TypeError(".hydrosphere.onnx.TypeProto.Tensor.shape: object expected");
                        message.shape = $root.hydrosphere.onnx.TensorShapeProto.fromObject(object.shape);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Tensor message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @static
                 * @param {hydrosphere.onnx.TypeProto.Tensor} message Tensor
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Tensor.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.elemType = options.enums === String ? "UNDEFINED" : 0;
                        object.shape = null;
                    }
                    if (message.elemType != null && message.hasOwnProperty("elemType"))
                        object.elemType = options.enums === String ? $root.hydrosphere.onnx.TensorProto.DataType[message.elemType] : message.elemType;
                    if (message.shape != null && message.hasOwnProperty("shape"))
                        object.shape = $root.hydrosphere.onnx.TensorShapeProto.toObject(message.shape, options);
                    return object;
                };

                /**
                 * Converts this Tensor to JSON.
                 * @function toJSON
                 * @memberof hydrosphere.onnx.TypeProto.Tensor
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Tensor.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Tensor;
            })();

            return TypeProto;
        })();

        onnx.OperatorSetIdProto = (function() {

            /**
             * Properties of an OperatorSetIdProto.
             * @memberof hydrosphere.onnx
             * @interface IOperatorSetIdProto
             * @property {string|null} [domain] OperatorSetIdProto domain
             * @property {number|Long|null} [version] OperatorSetIdProto version
             */

            /**
             * Constructs a new OperatorSetIdProto.
             * @memberof hydrosphere.onnx
             * @classdesc Represents an OperatorSetIdProto.
             * @implements IOperatorSetIdProto
             * @constructor
             * @param {hydrosphere.onnx.IOperatorSetIdProto=} [properties] Properties to set
             */
            function OperatorSetIdProto(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OperatorSetIdProto domain.
             * @member {string} domain
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @instance
             */
            OperatorSetIdProto.prototype.domain = "";

            /**
             * OperatorSetIdProto version.
             * @member {number|Long} version
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @instance
             */
            OperatorSetIdProto.prototype.version = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new OperatorSetIdProto instance using the specified properties.
             * @function create
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @static
             * @param {hydrosphere.onnx.IOperatorSetIdProto=} [properties] Properties to set
             * @returns {hydrosphere.onnx.OperatorSetIdProto} OperatorSetIdProto instance
             */
            OperatorSetIdProto.create = function create(properties) {
                return new OperatorSetIdProto(properties);
            };

            /**
             * Encodes the specified OperatorSetIdProto message. Does not implicitly {@link hydrosphere.onnx.OperatorSetIdProto.verify|verify} messages.
             * @function encode
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @static
             * @param {hydrosphere.onnx.IOperatorSetIdProto} message OperatorSetIdProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OperatorSetIdProto.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.domain != null && message.hasOwnProperty("domain"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.domain);
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.version);
                return writer;
            };

            /**
             * Encodes the specified OperatorSetIdProto message, length delimited. Does not implicitly {@link hydrosphere.onnx.OperatorSetIdProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @static
             * @param {hydrosphere.onnx.IOperatorSetIdProto} message OperatorSetIdProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OperatorSetIdProto.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an OperatorSetIdProto message from the specified reader or buffer.
             * @function decode
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {hydrosphere.onnx.OperatorSetIdProto} OperatorSetIdProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OperatorSetIdProto.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hydrosphere.onnx.OperatorSetIdProto();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.domain = reader.string();
                        break;
                    case 2:
                        message.version = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an OperatorSetIdProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {hydrosphere.onnx.OperatorSetIdProto} OperatorSetIdProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OperatorSetIdProto.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an OperatorSetIdProto message.
             * @function verify
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OperatorSetIdProto.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.domain != null && message.hasOwnProperty("domain"))
                    if (!$util.isString(message.domain))
                        return "domain: string expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isInteger(message.version) && !(message.version && $util.isInteger(message.version.low) && $util.isInteger(message.version.high)))
                        return "version: integer|Long expected";
                return null;
            };

            /**
             * Creates an OperatorSetIdProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {hydrosphere.onnx.OperatorSetIdProto} OperatorSetIdProto
             */
            OperatorSetIdProto.fromObject = function fromObject(object) {
                if (object instanceof $root.hydrosphere.onnx.OperatorSetIdProto)
                    return object;
                var message = new $root.hydrosphere.onnx.OperatorSetIdProto();
                if (object.domain != null)
                    message.domain = String(object.domain);
                if (object.version != null)
                    if ($util.Long)
                        (message.version = $util.Long.fromValue(object.version)).unsigned = false;
                    else if (typeof object.version === "string")
                        message.version = parseInt(object.version, 10);
                    else if (typeof object.version === "number")
                        message.version = object.version;
                    else if (typeof object.version === "object")
                        message.version = new $util.LongBits(object.version.low >>> 0, object.version.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an OperatorSetIdProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @static
             * @param {hydrosphere.onnx.OperatorSetIdProto} message OperatorSetIdProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OperatorSetIdProto.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.domain = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.version = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.version = options.longs === String ? "0" : 0;
                }
                if (message.domain != null && message.hasOwnProperty("domain"))
                    object.domain = message.domain;
                if (message.version != null && message.hasOwnProperty("version"))
                    if (typeof message.version === "number")
                        object.version = options.longs === String ? String(message.version) : message.version;
                    else
                        object.version = options.longs === String ? $util.Long.prototype.toString.call(message.version) : options.longs === Number ? new $util.LongBits(message.version.low >>> 0, message.version.high >>> 0).toNumber() : message.version;
                return object;
            };

            /**
             * Converts this OperatorSetIdProto to JSON.
             * @function toJSON
             * @memberof hydrosphere.onnx.OperatorSetIdProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OperatorSetIdProto.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return OperatorSetIdProto;
        })();

        return onnx;
    })();

    return hydrosphere;
})();

$root.tensorflow = (function() {

    /**
     * Namespace tensorflow.
     * @exports tensorflow
     * @namespace
     */
    var tensorflow = {};

    tensorflow.serving = (function() {

        /**
         * Namespace serving.
         * @memberof tensorflow
         * @namespace
         */
        var serving = {};

        serving.PredictionService = (function() {

            /**
             * Constructs a new PredictionService service.
             * @memberof tensorflow.serving
             * @classdesc Represents a PredictionService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function PredictionService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (PredictionService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = PredictionService;

            /**
             * Creates new PredictionService service using the specified rpc implementation.
             * @function create
             * @memberof tensorflow.serving.PredictionService
             * @static
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             * @returns {PredictionService} RPC service. Useful where requests and/or responses are streamed.
             */
            PredictionService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                return new this(rpcImpl, requestDelimited, responseDelimited);
            };

            /**
             * Callback as used by {@link tensorflow.serving.PredictionService#predict}.
             * @memberof tensorflow.serving.PredictionService
             * @typedef PredictCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {hydrosphere.tensorflow.serving.PredictResponse} [response] PredictResponse
             */

            /**
             * Calls Predict.
             * @function predict
             * @memberof tensorflow.serving.PredictionService
             * @instance
             * @param {hydrosphere.tensorflow.serving.IPredictRequest} request PredictRequest message or plain object
             * @param {tensorflow.serving.PredictionService.PredictCallback} callback Node-style callback called with the error, if any, and PredictResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(PredictionService.prototype.predict = function predict(request, callback) {
                return this.rpcCall(predict, $root.hydrosphere.tensorflow.serving.PredictRequest, $root.hydrosphere.tensorflow.serving.PredictResponse, request, callback);
            }, "name", { value: "Predict" });

            /**
             * Calls Predict.
             * @function predict
             * @memberof tensorflow.serving.PredictionService
             * @instance
             * @param {hydrosphere.tensorflow.serving.IPredictRequest} request PredictRequest message or plain object
             * @returns {Promise<hydrosphere.tensorflow.serving.PredictResponse>} Promise
             * @variation 2
             */

            return PredictionService;
        })();

        return serving;
    })();

    return tensorflow;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Empty = (function() {

            /**
             * Properties of an Empty.
             * @memberof google.protobuf
             * @interface IEmpty
             */

            /**
             * Constructs a new Empty.
             * @memberof google.protobuf
             * @classdesc Represents an Empty.
             * @implements IEmpty
             * @constructor
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             */
            function Empty(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Empty instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             * @returns {google.protobuf.Empty} Empty instance
             */
            Empty.create = function create(properties) {
                return new Empty(properties);
            };

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Empty.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Empty();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Empty.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Empty message.
             * @function verify
             * @memberof google.protobuf.Empty
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Empty.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Empty
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Empty} Empty
             */
            Empty.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Empty)
                    return object;
                return new $root.google.protobuf.Empty();
            };

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.Empty} message Empty
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Empty.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Empty to JSON.
             * @function toJSON
             * @memberof google.protobuf.Empty
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Empty.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Empty;
        })();

        protobuf.DoubleValue = (function() {

            /**
             * Properties of a DoubleValue.
             * @memberof google.protobuf
             * @interface IDoubleValue
             * @property {number|null} [value] DoubleValue value
             */

            /**
             * Constructs a new DoubleValue.
             * @memberof google.protobuf
             * @classdesc Represents a DoubleValue.
             * @implements IDoubleValue
             * @constructor
             * @param {google.protobuf.IDoubleValue=} [properties] Properties to set
             */
            function DoubleValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DoubleValue value.
             * @member {number} value
             * @memberof google.protobuf.DoubleValue
             * @instance
             */
            DoubleValue.prototype.value = 0;

            /**
             * Creates a new DoubleValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {google.protobuf.IDoubleValue=} [properties] Properties to set
             * @returns {google.protobuf.DoubleValue} DoubleValue instance
             */
            DoubleValue.create = function create(properties) {
                return new DoubleValue(properties);
            };

            /**
             * Encodes the specified DoubleValue message. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {google.protobuf.IDoubleValue} message DoubleValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DoubleValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.value);
                return writer;
            };

            /**
             * Encodes the specified DoubleValue message, length delimited. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {google.protobuf.IDoubleValue} message DoubleValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DoubleValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DoubleValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.DoubleValue} DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DoubleValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.DoubleValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.double();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DoubleValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.DoubleValue} DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DoubleValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DoubleValue message.
             * @function verify
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DoubleValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (typeof message.value !== "number")
                        return "value: number expected";
                return null;
            };

            /**
             * Creates a DoubleValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.DoubleValue} DoubleValue
             */
            DoubleValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.DoubleValue)
                    return object;
                var message = new $root.google.protobuf.DoubleValue();
                if (object.value != null)
                    message.value = Number(object.value);
                return message;
            };

            /**
             * Creates a plain object from a DoubleValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {google.protobuf.DoubleValue} message DoubleValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DoubleValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.value = 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.json && !isFinite(message.value) ? String(message.value) : message.value;
                return object;
            };

            /**
             * Converts this DoubleValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.DoubleValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DoubleValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DoubleValue;
        })();

        protobuf.FloatValue = (function() {

            /**
             * Properties of a FloatValue.
             * @memberof google.protobuf
             * @interface IFloatValue
             * @property {number|null} [value] FloatValue value
             */

            /**
             * Constructs a new FloatValue.
             * @memberof google.protobuf
             * @classdesc Represents a FloatValue.
             * @implements IFloatValue
             * @constructor
             * @param {google.protobuf.IFloatValue=} [properties] Properties to set
             */
            function FloatValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FloatValue value.
             * @member {number} value
             * @memberof google.protobuf.FloatValue
             * @instance
             */
            FloatValue.prototype.value = 0;

            /**
             * Creates a new FloatValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {google.protobuf.IFloatValue=} [properties] Properties to set
             * @returns {google.protobuf.FloatValue} FloatValue instance
             */
            FloatValue.create = function create(properties) {
                return new FloatValue(properties);
            };

            /**
             * Encodes the specified FloatValue message. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {google.protobuf.IFloatValue} message FloatValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FloatValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 5 =*/13).float(message.value);
                return writer;
            };

            /**
             * Encodes the specified FloatValue message, length delimited. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {google.protobuf.IFloatValue} message FloatValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FloatValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FloatValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FloatValue} FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FloatValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.FloatValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.float();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a FloatValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.FloatValue} FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FloatValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FloatValue message.
             * @function verify
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FloatValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (typeof message.value !== "number")
                        return "value: number expected";
                return null;
            };

            /**
             * Creates a FloatValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FloatValue} FloatValue
             */
            FloatValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.FloatValue)
                    return object;
                var message = new $root.google.protobuf.FloatValue();
                if (object.value != null)
                    message.value = Number(object.value);
                return message;
            };

            /**
             * Creates a plain object from a FloatValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {google.protobuf.FloatValue} message FloatValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FloatValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.value = 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.json && !isFinite(message.value) ? String(message.value) : message.value;
                return object;
            };

            /**
             * Converts this FloatValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.FloatValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FloatValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return FloatValue;
        })();

        protobuf.Int64Value = (function() {

            /**
             * Properties of an Int64Value.
             * @memberof google.protobuf
             * @interface IInt64Value
             * @property {number|Long|null} [value] Int64Value value
             */

            /**
             * Constructs a new Int64Value.
             * @memberof google.protobuf
             * @classdesc Represents an Int64Value.
             * @implements IInt64Value
             * @constructor
             * @param {google.protobuf.IInt64Value=} [properties] Properties to set
             */
            function Int64Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Int64Value value.
             * @member {number|Long} value
             * @memberof google.protobuf.Int64Value
             * @instance
             */
            Int64Value.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new Int64Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {google.protobuf.IInt64Value=} [properties] Properties to set
             * @returns {google.protobuf.Int64Value} Int64Value instance
             */
            Int64Value.create = function create(properties) {
                return new Int64Value(properties);
            };

            /**
             * Encodes the specified Int64Value message. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {google.protobuf.IInt64Value} message Int64Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Int64Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.value);
                return writer;
            };

            /**
             * Encodes the specified Int64Value message, length delimited. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {google.protobuf.IInt64Value} message Int64Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Int64Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Int64Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Int64Value} Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Int64Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Int64Value();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Int64Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Int64Value} Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Int64Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Int64Value message.
             * @function verify
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Int64Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                        return "value: integer|Long expected";
                return null;
            };

            /**
             * Creates an Int64Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Int64Value} Int64Value
             */
            Int64Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Int64Value)
                    return object;
                var message = new $root.google.protobuf.Int64Value();
                if (object.value != null)
                    if ($util.Long)
                        (message.value = $util.Long.fromValue(object.value)).unsigned = false;
                    else if (typeof object.value === "string")
                        message.value = parseInt(object.value, 10);
                    else if (typeof object.value === "number")
                        message.value = object.value;
                    else if (typeof object.value === "object")
                        message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an Int64Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {google.protobuf.Int64Value} message Int64Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Int64Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.value = options.longs === String ? "0" : 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    if (typeof message.value === "number")
                        object.value = options.longs === String ? String(message.value) : message.value;
                    else
                        object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber() : message.value;
                return object;
            };

            /**
             * Converts this Int64Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.Int64Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Int64Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Int64Value;
        })();

        protobuf.UInt64Value = (function() {

            /**
             * Properties of a UInt64Value.
             * @memberof google.protobuf
             * @interface IUInt64Value
             * @property {number|Long|null} [value] UInt64Value value
             */

            /**
             * Constructs a new UInt64Value.
             * @memberof google.protobuf
             * @classdesc Represents a UInt64Value.
             * @implements IUInt64Value
             * @constructor
             * @param {google.protobuf.IUInt64Value=} [properties] Properties to set
             */
            function UInt64Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UInt64Value value.
             * @member {number|Long} value
             * @memberof google.protobuf.UInt64Value
             * @instance
             */
            UInt64Value.prototype.value = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new UInt64Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {google.protobuf.IUInt64Value=} [properties] Properties to set
             * @returns {google.protobuf.UInt64Value} UInt64Value instance
             */
            UInt64Value.create = function create(properties) {
                return new UInt64Value(properties);
            };

            /**
             * Encodes the specified UInt64Value message. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {google.protobuf.IUInt64Value} message UInt64Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UInt64Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.value);
                return writer;
            };

            /**
             * Encodes the specified UInt64Value message, length delimited. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {google.protobuf.IUInt64Value} message UInt64Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UInt64Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a UInt64Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.UInt64Value} UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UInt64Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.UInt64Value();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a UInt64Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.UInt64Value} UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UInt64Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a UInt64Value message.
             * @function verify
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UInt64Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                        return "value: integer|Long expected";
                return null;
            };

            /**
             * Creates a UInt64Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.UInt64Value} UInt64Value
             */
            UInt64Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.UInt64Value)
                    return object;
                var message = new $root.google.protobuf.UInt64Value();
                if (object.value != null)
                    if ($util.Long)
                        (message.value = $util.Long.fromValue(object.value)).unsigned = true;
                    else if (typeof object.value === "string")
                        message.value = parseInt(object.value, 10);
                    else if (typeof object.value === "number")
                        message.value = object.value;
                    else if (typeof object.value === "object")
                        message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a UInt64Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {google.protobuf.UInt64Value} message UInt64Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UInt64Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.value = options.longs === String ? "0" : 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    if (typeof message.value === "number")
                        object.value = options.longs === String ? String(message.value) : message.value;
                    else
                        object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber(true) : message.value;
                return object;
            };

            /**
             * Converts this UInt64Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.UInt64Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UInt64Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UInt64Value;
        })();

        protobuf.Int32Value = (function() {

            /**
             * Properties of an Int32Value.
             * @memberof google.protobuf
             * @interface IInt32Value
             * @property {number|null} [value] Int32Value value
             */

            /**
             * Constructs a new Int32Value.
             * @memberof google.protobuf
             * @classdesc Represents an Int32Value.
             * @implements IInt32Value
             * @constructor
             * @param {google.protobuf.IInt32Value=} [properties] Properties to set
             */
            function Int32Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Int32Value value.
             * @member {number} value
             * @memberof google.protobuf.Int32Value
             * @instance
             */
            Int32Value.prototype.value = 0;

            /**
             * Creates a new Int32Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {google.protobuf.IInt32Value=} [properties] Properties to set
             * @returns {google.protobuf.Int32Value} Int32Value instance
             */
            Int32Value.create = function create(properties) {
                return new Int32Value(properties);
            };

            /**
             * Encodes the specified Int32Value message. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {google.protobuf.IInt32Value} message Int32Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Int32Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
                return writer;
            };

            /**
             * Encodes the specified Int32Value message, length delimited. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {google.protobuf.IInt32Value} message Int32Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Int32Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Int32Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Int32Value} Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Int32Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Int32Value();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Int32Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Int32Value} Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Int32Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Int32Value message.
             * @function verify
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Int32Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value))
                        return "value: integer expected";
                return null;
            };

            /**
             * Creates an Int32Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Int32Value} Int32Value
             */
            Int32Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Int32Value)
                    return object;
                var message = new $root.google.protobuf.Int32Value();
                if (object.value != null)
                    message.value = object.value | 0;
                return message;
            };

            /**
             * Creates a plain object from an Int32Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {google.protobuf.Int32Value} message Int32Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Int32Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.value = 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this Int32Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.Int32Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Int32Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Int32Value;
        })();

        protobuf.UInt32Value = (function() {

            /**
             * Properties of a UInt32Value.
             * @memberof google.protobuf
             * @interface IUInt32Value
             * @property {number|null} [value] UInt32Value value
             */

            /**
             * Constructs a new UInt32Value.
             * @memberof google.protobuf
             * @classdesc Represents a UInt32Value.
             * @implements IUInt32Value
             * @constructor
             * @param {google.protobuf.IUInt32Value=} [properties] Properties to set
             */
            function UInt32Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UInt32Value value.
             * @member {number} value
             * @memberof google.protobuf.UInt32Value
             * @instance
             */
            UInt32Value.prototype.value = 0;

            /**
             * Creates a new UInt32Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {google.protobuf.IUInt32Value=} [properties] Properties to set
             * @returns {google.protobuf.UInt32Value} UInt32Value instance
             */
            UInt32Value.create = function create(properties) {
                return new UInt32Value(properties);
            };

            /**
             * Encodes the specified UInt32Value message. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {google.protobuf.IUInt32Value} message UInt32Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UInt32Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.value);
                return writer;
            };

            /**
             * Encodes the specified UInt32Value message, length delimited. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {google.protobuf.IUInt32Value} message UInt32Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UInt32Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a UInt32Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.UInt32Value} UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UInt32Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.UInt32Value();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a UInt32Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.UInt32Value} UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UInt32Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a UInt32Value message.
             * @function verify
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UInt32Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value))
                        return "value: integer expected";
                return null;
            };

            /**
             * Creates a UInt32Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.UInt32Value} UInt32Value
             */
            UInt32Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.UInt32Value)
                    return object;
                var message = new $root.google.protobuf.UInt32Value();
                if (object.value != null)
                    message.value = object.value >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a UInt32Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {google.protobuf.UInt32Value} message UInt32Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UInt32Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.value = 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this UInt32Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.UInt32Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UInt32Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UInt32Value;
        })();

        protobuf.BoolValue = (function() {

            /**
             * Properties of a BoolValue.
             * @memberof google.protobuf
             * @interface IBoolValue
             * @property {boolean|null} [value] BoolValue value
             */

            /**
             * Constructs a new BoolValue.
             * @memberof google.protobuf
             * @classdesc Represents a BoolValue.
             * @implements IBoolValue
             * @constructor
             * @param {google.protobuf.IBoolValue=} [properties] Properties to set
             */
            function BoolValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BoolValue value.
             * @member {boolean} value
             * @memberof google.protobuf.BoolValue
             * @instance
             */
            BoolValue.prototype.value = false;

            /**
             * Creates a new BoolValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {google.protobuf.IBoolValue=} [properties] Properties to set
             * @returns {google.protobuf.BoolValue} BoolValue instance
             */
            BoolValue.create = function create(properties) {
                return new BoolValue(properties);
            };

            /**
             * Encodes the specified BoolValue message. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {google.protobuf.IBoolValue} message BoolValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BoolValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.value);
                return writer;
            };

            /**
             * Encodes the specified BoolValue message, length delimited. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {google.protobuf.IBoolValue} message BoolValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BoolValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BoolValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.BoolValue} BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BoolValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.BoolValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BoolValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.BoolValue} BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BoolValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BoolValue message.
             * @function verify
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BoolValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (typeof message.value !== "boolean")
                        return "value: boolean expected";
                return null;
            };

            /**
             * Creates a BoolValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.BoolValue} BoolValue
             */
            BoolValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.BoolValue)
                    return object;
                var message = new $root.google.protobuf.BoolValue();
                if (object.value != null)
                    message.value = Boolean(object.value);
                return message;
            };

            /**
             * Creates a plain object from a BoolValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {google.protobuf.BoolValue} message BoolValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BoolValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.value = false;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this BoolValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.BoolValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BoolValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return BoolValue;
        })();

        protobuf.StringValue = (function() {

            /**
             * Properties of a StringValue.
             * @memberof google.protobuf
             * @interface IStringValue
             * @property {string|null} [value] StringValue value
             */

            /**
             * Constructs a new StringValue.
             * @memberof google.protobuf
             * @classdesc Represents a StringValue.
             * @implements IStringValue
             * @constructor
             * @param {google.protobuf.IStringValue=} [properties] Properties to set
             */
            function StringValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * StringValue value.
             * @member {string} value
             * @memberof google.protobuf.StringValue
             * @instance
             */
            StringValue.prototype.value = "";

            /**
             * Creates a new StringValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.StringValue
             * @static
             * @param {google.protobuf.IStringValue=} [properties] Properties to set
             * @returns {google.protobuf.StringValue} StringValue instance
             */
            StringValue.create = function create(properties) {
                return new StringValue(properties);
            };

            /**
             * Encodes the specified StringValue message. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.StringValue
             * @static
             * @param {google.protobuf.IStringValue} message StringValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StringValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.value);
                return writer;
            };

            /**
             * Encodes the specified StringValue message, length delimited. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.StringValue
             * @static
             * @param {google.protobuf.IStringValue} message StringValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StringValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StringValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.StringValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.StringValue} StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StringValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.StringValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StringValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.StringValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.StringValue} StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StringValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StringValue message.
             * @function verify
             * @memberof google.protobuf.StringValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StringValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isString(message.value))
                        return "value: string expected";
                return null;
            };

            /**
             * Creates a StringValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.StringValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.StringValue} StringValue
             */
            StringValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.StringValue)
                    return object;
                var message = new $root.google.protobuf.StringValue();
                if (object.value != null)
                    message.value = String(object.value);
                return message;
            };

            /**
             * Creates a plain object from a StringValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.StringValue
             * @static
             * @param {google.protobuf.StringValue} message StringValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StringValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.value = "";
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this StringValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.StringValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StringValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return StringValue;
        })();

        protobuf.BytesValue = (function() {

            /**
             * Properties of a BytesValue.
             * @memberof google.protobuf
             * @interface IBytesValue
             * @property {Uint8Array|null} [value] BytesValue value
             */

            /**
             * Constructs a new BytesValue.
             * @memberof google.protobuf
             * @classdesc Represents a BytesValue.
             * @implements IBytesValue
             * @constructor
             * @param {google.protobuf.IBytesValue=} [properties] Properties to set
             */
            function BytesValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BytesValue value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.BytesValue
             * @instance
             */
            BytesValue.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new BytesValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {google.protobuf.IBytesValue=} [properties] Properties to set
             * @returns {google.protobuf.BytesValue} BytesValue instance
             */
            BytesValue.create = function create(properties) {
                return new BytesValue(properties);
            };

            /**
             * Encodes the specified BytesValue message. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {google.protobuf.IBytesValue} message BytesValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BytesValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified BytesValue message, length delimited. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {google.protobuf.IBytesValue} message BytesValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BytesValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BytesValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.BytesValue} BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BytesValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.BytesValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BytesValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.BytesValue} BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BytesValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BytesValue message.
             * @function verify
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BytesValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates a BytesValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.BytesValue} BytesValue
             */
            BytesValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.BytesValue)
                    return object;
                var message = new $root.google.protobuf.BytesValue();
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from a BytesValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {google.protobuf.BytesValue} message BytesValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BytesValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this BytesValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.BytesValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BytesValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return BytesValue;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
