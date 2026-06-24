import React from "react";

const Products = ({ params }: { params: { slug: string } }) => {
  return <div>Products - {params.slug}</div>;
};

export default Products;
