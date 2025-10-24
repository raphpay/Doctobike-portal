import CacheKeys from "@/features/cache/model/CacheKeys";
import { getEmployeeFromUser } from "@/features/employees/api/getEmployeeFromUser";
import type Employee from "@/features/employees/model/Employee";
import { getShop } from "@/features/shop/api/getShop";
import type Shop from "@/features/shop/model/Shop";
import { getUser } from "@/features/users/api/getUser";
import type User from "@/features/users/model/User";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      const id = localStorage.getItem(CacheKeys.USER_ID);
      if (id) {
        const data = await getUser(id);
        if (!ignore) setUser(data ?? null);
        const employeeData = await getEmployeeFromUser(data.id);
        if (employeeData) {
          setEmployee(employeeData);
          const shopData = await getShop(employeeData.shopID);
          if (shopData) setShop(shopData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    init();
  }, []);

  return { user, employee, shop, loading };
}
