import { connect, Connection } from "@textile/tableland";

const tableBaseName = "entropicNFTs";

let NFTTableId: string | undefined;

const createNFTTable = async (tbl: Connection): Promise<string> => {
  const NFTTableRes = await tbl.create(
    `CREATE TABLE ${tableBaseName} (name text, brand text, description text, stem1cid text, stem1type text, stem2cid text, stem2type text, stem3cid text, stem3type text, stem4cid text, stem4type text, stem5cid text, stem5type text, stem6cid text, stem6type text, stem7cid text, stem7type text, primary key (name));`,
    { description: "Entropic utility NFT Table" }
  );
  console.log("CREATED Utility NFT TABLE");

  return NFTTableRes.name;
};

const getNFTTable = async (tbl: Connection): Promise<string> => {
  if (NFTTableId) return NFTTableId;

  // for now query tables and look for match
  const currTables = await tbl.list();

  const NFTTbl = currTables.find((t) => t.name!.includes(tableBaseName));

  if (!NFTTbl) {
    NFTTableId = await createNFTTable(tbl);
  } else {
    NFTTableId = NFTTbl.name!;
  }

  return NFTTableId;
};

const addUtility = async (UtilityData: UtilityData) => {
  const tbl = await connect({ network: "testnet", signer });

  const tblName = await getNFTTable(tbl);

  try {
    const req = `INSERT INTO ${tblName} (name, brand, description, );`;

    const insert = await tbl.query(req);
  } catch (error) {
    console.log(error);
  }
};

async function tblInit() {
  const tbl = await connect({ network: "testnet", signer });
  const tblid = await getNFTTable(tbl);

  console.log(tblid);
}

// create table if does not exist on startup
tblInit();

const getUtilitys = async () => {
  const tbl = await connect({ network: "testnet", signer });

  const tblName = await getNFTTable(tbl);

  const query = `SELECT name, brand FROM ${tblName};`;

  const q = await tbl.query(query);

  // @ts-ignore
  return q.data.rows;
};

export { addUtility, getUtilitys };
