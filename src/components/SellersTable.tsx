import { defineComponent, type PropType, ref } from "vue";
import { globalTranslate } from "@/utils/globalTranslate";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { store } from "@/store";
import { UiPagination } from "./ui/UiPagination";
import { Checkbox } from "./ui/checkbox";
import { RouterLink } from "vue-router";
import type { sellerT } from "@/types";
import UiIcon from "./ui/UiIcon.vue";

export const SellersTable = defineComponent({
  name: "SellersTable",
  props: {
    Sellers: {
      type: Array as PropType<sellerT[]>,
      required: true,
    },
  },
  components: { Checkbox, UiIcon, UiPagination },
  setup(props) {
    const checkedSellers = ref<number[]>([]);

    const checkThisUser = (IsInclude: boolean, id: number) => {
      IsInclude
        ? checkedSellers.value.push(id)
        : checkedSellers.value.splice(checkedSellers.value.indexOf(id), 1);
    };
    const toggleThisSeller = (Seller: sellerT, name: string) => {
      store.setters.updateStore({ key: "row", value: Seller });
      store.setters.updateStore({ key: "name", value: name });
      store.setters.updateStore({ key: "show", value: true });
    };

    return () => (
      <div class="flex flex-col w-full">
        <table class="table-auto w-full">
          <thead class="text-xs h-9 font-semibold uppercase text-[rgba(25,23,17,0.6)] bg-gray-300">
            <tr class="">
              <th class="rounded-l-[4px]"></th>
              <th class=""></th>
              {[0, 1, 2, 3, 4].map((index) => (
                <th class="p-2 w-fit last:rounded-r-[4px]">
                  <div class="font-semibold text-left">
                    {globalTranslate(`Sellers.index.feilds[${index}]`)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100">
            {props.Sellers.map((Seller, index) => (
              <tr v-fade={index} key={Seller.id}>
                <td class="p-2">
                  <span class="h-full w-full grid">
                    <Checkbox
                    // onCheck={(check) => checkThisUser(check, Seller.id)}
                    />
                  </span>
                </td>
                <td class="p-2">
                  <div class="w-12 h-12 rounded-full overflow-hidden">
                    {Seller.image && Seller.image !== "" ? (
                      <img
                        class="rounded-full w-full h-full object-cover"
                        src={convertFileSrc(Seller.image)}
                      />
                    ) : (
                      <span class=" rounded-full w-full h-full object-fill animate-pulse bg-slate-300 duration-150" />
                    )}
                  </div>
                </td>
                <td class="p-2">
                  <div class="font-medium text-gray-800">{Seller.name}</div>
                </td>
                <td class="p-2">
                  <div class="text-left whitespace-nowrap overflow-ellipsis">
                    {Seller.email ?? <span class="text-red-400">No email</span>}
                  </div>
                </td>
                <td class="p-2">
                  <div class="text-left whitespace-nowrap overflow-ellipsis">
                    {Seller.phone ?? <span class="text-red-400">No phone</span>}
                  </div>
                </td>
                <td class="p-2">
                  <div class="text-left whitespace-nowrap overflow-ellipsis">
                    {Seller.address ?? (
                      <span class="text-red-400">No address</span>
                    )}
                  </div>
                </td>
                <td class="p-2">
                  <div class="flex  w-full justify-start gap-3">
                    <span
                      onClick={() => toggleThisSeller(Seller, "SellerDelete")}
                    >
                      <UiIcon name={"delete"} />
                    </span>
                    <span
                      onClick={() => toggleThisSeller(Seller, "SellerUpdate")}
                    >
                      <UiIcon name={"edit"} />
                    </span>
                    <RouterLink
                      to={{
                        name: "SellerDetails",
                        params: { id: Seller.id },
                      }}
                    >
                      <UiIcon name={"more"} />
                    </RouterLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <UiPagination />
        </div>
      </div>
    );
  },
});
