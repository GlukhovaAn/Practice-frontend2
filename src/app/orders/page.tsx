"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ordersData } from "./data";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>(ordersData);
  const [filteredOrders, setFilteredOrders] = useState<any[]>(ordersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    let result = [...orders];

    // Поиск по имени клиента
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((order) =>
        order.user.toLowerCase().includes(term)
      );
    }

    // Фильтр по статусу
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, orders]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">Все заказы</h1>
      </div>
      {/* Панель фильтров */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 border rounded-lg">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Поиск по имени клиента */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Поиск по клиенту..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Фильтр по статусу */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="new">Новый</SelectItem>
              <SelectItem value="active">Активный</SelectItem>
              <SelectItem value="inactive">Неактивный</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Сброс фильтров и счетчик */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Найдено: {filteredOrders.length} из {orders.length}
          </div>
          {(searchTerm || statusFilter !== "all") && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="h-9"
            >
              <X className="h-4 w-4 mr-2" />
              Сбросить
            </Button>
          )}
        </div>
      </div>
      <DataTable columns={columns} data={filteredOrders} />
    </div>
  );
};

export default OrdersPage;
