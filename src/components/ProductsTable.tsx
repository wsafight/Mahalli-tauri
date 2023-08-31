import { defineComponent, ref, type PropType } from "vue";
import { useModalStore } from "@/stores/modalStore";
import { UiPagination } from "./ui/UiPagination";
import { UiCheckBox } from "./ui/UiCheckBox";
import type { productT } from "@/types";
import UiIcon from "./ui/UiIcon.vue";
import { globalTranslate } from "@/utils/globalTranslate";

export const ProductsTable = defineComponent({
  name: "ProductsTable",
  components: { UiCheckBox, UiIcon, UiPagination },
  props: {
    Products: {
      type: Array as PropType<productT[]>,
      required: true,
    },
    FilterParam: {
      type: String,
      required: true,
      default: "",
    },
  },
  setup(props) {
    const modalStore = useModalStore();
    //
    const pagination = ref<number>(0);
    //
    const toggleThisProduct = (product: productT, name: string) => {
      modalStore.updateProductRow(product);
      modalStore.updateModal({ key: "name", value: name });
      modalStore.updateModal({ key: "show", value: true });
    };
    return () => (
      <div class="w-full flex flex-col">
        <table class="table-auto  w-full">
          <thead class="text-xs h-9 font-semibold uppercase text-[rgba(25,23,17,0.6)] bg-gray-300">
            <tr>
              <th class="rounded-l-md"></th>
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <th class="p-2 w-fit last:rounded-r-md">
                  <div class="font-semibold  text-left">
                    {globalTranslate(`Products.index.feilds[${index}]`)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100">
            {props.Products.filter((c) =>
              // @ts-ignore
              JSON.stringify(Object.values(c))
                .toLocaleLowerCase()
                .includes(props.FilterParam)
            )
              .slice(pagination.value * 17, pagination.value * 17 + 17)
              .map((product, index) => (
                <tr v-fade={index} key={product.id}>
                  <td class="p-2">
                    <span class="h-full w-full grid">
                      <UiCheckBox
                        onCheck={(check) =>
                          console.log(
                            product.name,
                            check ? "is checked" : "is unchecked"
                          )
                        }
                      />
                    </span>
                  </td>
                  <td class="p-2">
                    <div class="font-medium text-gray-800">{product.name}</div>
                  </td>
                  <td class="p-2">
                    <div class="font-medium text-gray-800">
                      {product.description}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-left">{product.price.toFixed(2)} DH</div>
                  </td>
                  <td class="p-2">
                    <div class="text-left">{product.tva.toFixed(2)} %</div>
                  </td>
                  <td class="p-2">
                    <div class="text-left">{product?.quantity} item</div>
                  </td>
                  <td class="p-2">
                    <div class="flex  justify-start gap-3">
                      <span
                        onClick={() =>
                          toggleThisProduct(product, "ProductDelete")
                        }
                      >
                        <UiIcon name={"delete"} />
                      </span>
                      <span
                        onClick={() =>
                          toggleThisProduct(product, "ProductUpdate")
                        }
                      >
                        <UiIcon name={"edit"} />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <UiPagination
            goBack={() => pagination.value--}
            goForward={() => pagination.value++}
            itemsNumber={props.Products.length}
            page={pagination.value}
          />
        </div>
      </div>
    );
  },
});
