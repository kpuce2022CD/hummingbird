// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  price: number;
  content: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    {
      name: "토마토 연어 구이",
      price: 9000,
      content:
        "생토마토로 후레쉬한 소스를 만들어 연어스테이크와 곁들인 슈퍼푸드로 만든 건강한 요리!",
    },
    {
      name: "계란 오이 정식",
      price: 7000,
      content:
        "싱싱한 슬라이스 오이에 부드럽게 익은 달걀을 고소한 견과류와 곁들인 비건 정식!",
    },
    {
      name: "토마토 연어 구이",
      price: 9000,
      content:
        "생토마토로 후레쉬한 소스를 만들어 연어스테이크와 곁들인 슈퍼푸드로 만든 건강한 요리!",
    },
    {
      name: "계란 오이 정식",
      price: 7000,
      content:
        "싱싱한 슬라이스 오이에 부드럽게 익은 달걀을 고소한 견과류와 곁들인 비건 정식!",
    },
    {
      name: "토마토 연어 구이",
      price: 9000,
      content:
        "생토마토로 후레쉬한 소스를 만들어 연어스테이크와 곁들인 슈퍼푸드로 만든 건강한 요리!",
    },
    {
      name: "계란 오이 정식",
      price: 7000,
      content:
        "싱싱한 슬라이스 오이에 부드럽게 익은 달걀을 고소한 견과류와 곁들인 비건 정식!",
    },
    {
      name: "토마토 연어 구이",
      price: 9000,
      content:
        "생토마토로 후레쉬한 소스를 만들어 연어스테이크와 곁들인 슈퍼푸드로 만든 건강한 요리!",
    },
    {
      name: "계란 오이 정식",
      price: 7000,
      content:
        "싱싱한 슬라이스 오이에 부드럽게 익은 달걀을 고소한 견과류와 곁들인 비건 정식!",
    },
  ]);
}
