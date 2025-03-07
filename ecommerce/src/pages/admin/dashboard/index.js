import React from "react";
import { useRouter } from "next/router";
import UserList from "@/components/molecules/UserList";
import CategoryList from "@/components/organisms/CategoryList";
import OrderList from "@/components/organisms/OrderList";
import ProductList from "@/components/organisms/ProductList";
import ButtonOnclick from "@/components/atoms/ButtonOnclick";
import { useAllCategories } from "@/hooks/useCategory";
import { useOrderByStatus } from "@/hooks/useOrder";
import { useProducts } from "@/hooks/useProduct";
import { useAllUsers } from "@/hooks/useUser";
import { getToken } from "@/services/authService";

const Dashboard = () => {
  const router = useRouter();
  const token = getToken();

  // Fetching data using hooks
  const { data: products, loading: loadingProducts, error: errorProducts } = useProducts();
  const { data: categories, loading: loadingCategories, error: errorCategories } = useAllCategories();
  const { data: orders, loading: loadingOrder, error: errorOrder } = useOrderByStatus(token);
  const { data: users, loading: loadingUsers, error: errorUsers } = useAllUsers(0, 5, token);

  return (
    <div className="p-6 space-y-6">
      {/* Products Section */}
      <section className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Products</h2>
          <div className="flex gap-2">
            <ButtonOnclick
              label="Add Product"
              onClick={() => router.push("/admin/product/add")}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            />
            <ButtonOnclick
              label="See All"
              onClick={() => router.push("/admin/product")}
              className="bg-gray-700 text-white px-3 py-1 rounded"
            />
          </div>
        </div>
        {loadingProducts && <p className="text-center text-gray-400">Loading products...</p>}
        {errorProducts && <p className="text-center text-red-500">{errorProducts}</p>}
        <div className="overflow-auto max-h-60">
          <ProductList data={products} admin={false} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Categories</h2>
          <ButtonOnclick
            label="See All"
            onClick={() => router.push("/admin/category")}
            className="bg-gray-700 text-white px-3 py-1 rounded"
          />
        </div>
        {loadingCategories && <p className="text-center text-gray-400">Loading categories...</p>}
        {errorCategories && <p className="text-center text-red-500">{errorCategories}</p>}
        <div className="overflow-auto max-h-60">
          <CategoryList categories={categories} />
        </div>
      </section>

      {/* Orders Section */}
      <section className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Orders</h2>
          <ButtonOnclick
            label="See All"
            onClick={() => router.push("/admin/orders")}
            className="bg-gray-700 text-white px-3 py-1 rounded"
          />
        </div>
        {loadingOrder && <p className="text-center text-gray-400">Loading orders...</p>}
        {errorOrder && <p className="text-center text-red-500">{errorOrder}</p>}
        <div className="overflow-auto max-h-60">
          <OrderList orders={orders} />
        </div>
      </section>

      {/* Users Section */}
      <section className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Users</h2>
          <ButtonOnclick
            label="See All"
            onClick={() => router.push("/admin/user")}
            className="bg-gray-700 text-white px-3 py-1 rounded"
          />
        </div>
        {loadingUsers && <p className="text-center text-gray-400">Loading users...</p>}
        {errorUsers && <p className="text-center text-red-500">{errorUsers}</p>}
        <div className="overflow-auto max-h-60">
          <UserList users={users?.data} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
