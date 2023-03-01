import crypto from "crypto";

const subToObjectId = (sub: string) => {
  const hashedStr = crypto.createHash("sha256").update(sub).digest("hex");
  return Buffer.from(hashedStr.substr(0, 24), "hex");
};

export default subToObjectId;
