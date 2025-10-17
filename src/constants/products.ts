import imgFloralCameo from "figma:asset/9852062dc33b199fc5a0419f7179a84765b0571c.png";
import imgScreenshot20251016At112537Am1 from "figma:asset/402f2982c38f9461c0b48a965ed93d73cfff7754.png";
import imgScreenshot20251016At112542Am1 from "figma:asset/ab64faf48917e403991f79b371f8fd23ee16b1de.png";
import img202510161127ClassicalCameoReliefRemix01K7Pxeqjqfcbskwch5Dbpcehs11 from "figma:asset/5521f773214b720235b99d0b03abee400424862e.png";
import img202510161139ChromeFramedReliefRemix01K7Pxrj77F50Bhj83Vm3Mhena1 from "figma:asset/af3a57071e3e767a17c2b7b589c1e24c1fb5f1e7.png";
import imgScreenshot20251016At112542Am2 from "figma:asset/6f947df5feadb735e518329b5a8f5ee96fe73087.png";
import imgWomanCameoIvory from "figma:asset/8c65ea7910b84d169525ac6fe6722f378315f26a.png";
import imgWomanCameoPaleBlue from "figma:asset/d98f33ca48dcd18a10c21442f9fb3c9e32bc04ce.png";
import imgWomanCameoPaleBlue1 from "figma:asset/0cb54863de3e01c2e19fcf9ad710790b800bc415.png";
import img202510161250HyperrealisticPinsDisplayRemix01K7Q27Fyefz6An3Ybqkpg88Bx1 from "figma:asset/4491c8d427268bccbc03250d6ba2ae84c6855a2b.png";
import type { CameoProduct } from "../types";

export const products: CameoProduct[] = [
  {
    id: 1,
    name: "LADY PORTRAIT No.001",
    category: "Portrait",
    variations: [
      { color: "Ivory", image: imgWomanCameoIvory, price: 245 },
      { color: "Pale Blue", image: imgWomanCameoPaleBlue, price: 245 },
      { color: "Burgundy", image: imgWomanCameoPaleBlue1, price: 245 },
    ],
  },
  {
    id: 2,
    name: "FLORAL RELIEF No.002",
    category: "Floral",
    variations: [{ color: "Classic Ivory", image: imgFloralCameo, price: 195 }],
  },
  {
    id: 4,
    name: "CLASSICAL BUST No.004",
    category: "Portrait",
    variations: [
      {
        color: "Aged Ivory",
        image: img202510161127ClassicalCameoReliefRemix01K7Pxeqjqfcbskwch5Dbpcehs11,
        price: 325,
      },
    ],
  },
  {
    id: 5,
    name: "CHROME FRAME No.005",
    category: "Ornamental",
    variations: [
      {
        color: "Polished Chrome",
        image: img202510161139ChromeFramedReliefRemix01K7Pxrj77F50Bhj83Vm3Mhena1,
        price: 345,
      },
    ],
  },
  {
    id: 6,
    name: "ORNATE FLORAL No.006",
    category: "Floral",
    variations: [
      {
        color: "Antique White",
        image: imgScreenshot20251016At112537Am1,
        price: 215,
      },
    ],
  },
  {
    id: 7,
    name: "TULIP RELIEF No.007",
    category: "Floral",
    variations: [
      {
        color: "Classic Ivory",
        image: imgScreenshot20251016At112542Am1,
        price: 185,
      },
    ],
  },
  {
    id: 8,
    name: "GRECIAN FIGURE No.008",
    category: "Portrait",
    variations: [
      {
        color: "Vintage White",
        image: imgScreenshot20251016At112542Am2,
        price: 295,
      },
    ],
  },
  {
    id: 9,
    name: "DAISY PIN No.009",
    category: "Pins",
    variations: [
      {
        color: "Gold Plated",
        image: img202510161250HyperrealisticPinsDisplayRemix01K7Q27Fyefz6An3Ybqkpg88Bx1,
        price: 165,
      },
    ],
  },
] as const;
