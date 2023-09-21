import { useUpdateRouteQueryParams } from "@/composables/useUpdateQuery";
import { CLIENT_CREATE } from "@/constants/defaultValues";
import { globalTranslate } from "@/utils/globalTranslate";
import { defineComponent, reactive, ref } from "vue";
import { ImagesFiles } from "@/constants/FileTypes";
import { UiUploader } from "./ui/UiUploader";
import type { newClientT } from "@/types";
import { invoke } from "@tauri-apps/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { saveFile } from "@/utils/fs";
import { store } from "@/store";

export const ClientCreate = defineComponent({
  name: "ClientCreate",
  components: { Button, Input },
  setup() {
    const { updateQueryParams } = useUpdateRouteQueryParams();

    const client = reactive<newClientT>(CLIENT_CREATE);
    const isFlash = ref<boolean>(false);

    const createNewClient = async () => {
      isFlash.value = true;
      if (client.fullname !== "") {
        try {
          let image: string = await saveFile(client.image as string, "Image");
          await invoke("insert_client", { client: { ...client, image } });
          // toggle refresh
          updateQueryParams({
            refresh: "refresh-create-" + Math.random() * 9999,
          });
        } catch (error) {
          console.log(error);
        } finally {
          store.setters.updateStore({ key: "show", value: false });
          return;
        }
      }
      setTimeout(() => {
        isFlash.value = false;
      }, 1000);
    };

    return () => (
      <div class="w-1/2 h-fit z-50 gap-3 rounded-[4px] flex flex-col bg-white p-2 min-w-[350px]">
        <h1 class="font-semibold text-lg text-gray-800 border-b-2 border-b-gray-500 pb-2 uppercase text-center">
          {globalTranslate("Clients.create.title")}
        </h1>
        <div class="h-full w-full flex  flex-col gap-2">
          <div class="w-full h-fit flex justify-center">
            <UiUploader
              name="Image"
              extensions={ImagesFiles}
              onSave={(image) => (client.image = image)}
            />
          </div>
          <Input
            IsEmpty={isFlash.value && client["fullname"] == ""}
            OnInputChange={(value) =>
              (client["fullname"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            type="text"
            placeHolder={globalTranslate("Clients.create.placeholders[0]")}
          />
          <Input
            IsEmpty={isFlash.value && client["email"] == ""}
            OnInputChange={(value) =>
              (client["email"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            type="text"
            placeHolder={globalTranslate("Clients.create.placeholders[1]")}
          />
          <Input
            IsEmpty={isFlash.value && client["phone"] == ""}
            OnInputChange={(value) =>
              (client["phone"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            type="text"
            placeHolder={globalTranslate("Clients.create.placeholders[2]")}
          />
          <Input
            IsEmpty={isFlash.value && client["address"] == ""}
            OnInputChange={(value) =>
              (client["address"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            type="text"
            placeHolder={globalTranslate("Clients.create.placeholders[3]")}
          />
        </div>
        <div class="flex">
          <Button colorTheme="a" Click={() => createNewClient()}>
            {globalTranslate("Clients.create.button")}
          </Button>
        </div>
      </div>
    );
  },
});
