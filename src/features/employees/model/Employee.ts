export default interface Employee {
  id: string;
  shopID: string;
  userID: string;
  roleInShop: "manager" | "technician" | "assistant";
  fullName: string;
  createdAt: Date;
}
