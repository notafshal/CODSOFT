import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Product {
  image: string;
  title: string;
  price: number;
  author: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard: React.FC<{ data: Product }> = ({ data }) => (
  <Card className=" hover:bg-gray-100 px-5 my-2">
    <CardHeader className="h-28">
      <CardTitle className="h-1/2">{data.title}</CardTitle>
      <CardDescription className="h-1/2">{data.author}</CardDescription>
    </CardHeader>
    <CardContent>
      <Image src={data.image} width={100} height={100} alt="product image" />
    </CardContent>
    <CardFooter>
      <p className="bg-green-500 text-white rounded-2xl p-1 ">
        Rs. {data.price}
      </p>
    </CardFooter>
  </Card>
);
export default ProductCard;
