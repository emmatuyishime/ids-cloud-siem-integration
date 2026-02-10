const crypto = global.get('crypto');

const workspaceId = " ";
const sharedKey = " ";

const mode = msg.payload.mode || "unknown";
const logType = (mode === "multi") ? "IIoTPredictions_Multi" : "IIoTPredictions_Binary";

const jsonBody = JSON.stringify({
    timestamp: new Date().toISOString(),
    mode: msg.payload.mode,
    prediction: msg.payload.prediction,
    raw_prediction: msg.payload.raw_prediction,
    class: msg.payload.class || null,
    true_label: msg.payload.true_label,
    source_ip: msg.payload.source_ip,
    node_id: msg.payload.node_id,
    sensor_id: msg.payload.sensor_id

});

const method = "POST";
const contentType = "application/json";
const resource = "/api/logs";
const rfc1123date = new Date().toUTCString();
const contentLength = Buffer.byteLength(jsonBody, 'utf8');

const stringToHash = method + "\n" + contentLength + "\n" + contentType + "\nx-ms-date:" + rfc1123date + "\n" + resource;
const decodedKey = Buffer.from(sharedKey, 'base64');
const encodedHash = crypto.createHmac('sha256', decodedKey).update(stringToHash, 'utf8').digest('base64');
const signature = "SharedKey " + workspaceId + ":" + encodedHash;

// headers
msg.headers = {
    "Content-Type": contentType,
    "Authorization": signature,
    "Log-Type": logType,
    "x-ms-date": rfc1123date,
    "time-generated-field": "timestamp"
};

msg.payload = jsonBody;
msg.method = "POST";
msg.url = `https://${workspaceId}.ods.opinsights.azure.com${resource}?api-version=2016-04-01`;

node.warn("Sending to Sentinel:");
node.warn({ url: msg.url, headers: msg.headers, payload: msg.payload });

return msg;