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
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard: React.FC<{ data: Product }> = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>{data.title}</CardTitle>
      <CardDescription>{data.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Image src={data.image} width={100} height={100} alt="product image" />
    </CardContent>
    <CardFooter>
      <p>Rs. {data.price}</p>
    </CardFooter>
  </Card>
);
export default ProductCard;
