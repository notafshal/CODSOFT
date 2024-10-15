"use client";
import { FaPlus } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
  });

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(user);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("userId", user?.id);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("description", description);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    axios
      .post("http://localhost:5000/api/product", formData)
      .then((result) => {
        if (result.status === 200) {
          alert("The product is successfully added!");
          router.push("/dashboard");
          setTitle("");
          setPrice(0);
          setDescription("");
          setCategory("");
          setStock(0);
          setAuthor("");
          setImage(null);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {" "}
      <Dialog>
        <DialogTrigger className="flex flex-row px-3 py-2 text-white bg-black text-md rounded-md hover:bg-gray-800">
          <FaPlus className="mt-1" /> <p className="mx-1">Add Product</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <form
            encType="multipart/form-data"
            className="flex flex-col gap-2"
            onSubmit={handleAddProduct}
          >
            <label>Product Name : </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Name"
              className="border-2"
            />
            <label>Author Name : </label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Product Name"
              className="border-2"
            />
            <br />
            <label>Price : </label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Price"
            />
            <br />
            <label>Stock : </label>
            <input
              type="number"
              name="stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder="Price"
            />
            <br />
            <label>Description : </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            ></textarea>
            <br />
            <label> Genre : </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="genre"
              placeholder="Genre"
            />
            <br />

            <label>Photo : </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              name="image"
            />
            <button
              type="submit"
              className="text-white bg-black rounded-md p-2 text-lg hover:bg-gray-800"
            >
              Add Product
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddProduct;
