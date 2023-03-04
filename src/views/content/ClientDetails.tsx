import { useClientStore } from "@/stores/clientStore";
import { defineComponent, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { ClientCard } from "@/components/ClientCard";
import { ChartBar } from "@/components/ChartBart";
import { globalTranslate } from "@/utils/globalTranslate";
import { useStatsStore } from "@/stores/statsStore";
import { useInvoiceStore } from "@/stores/invoiceStore";
import UiIcon from "@/components/ui/UiIcon.vue";

export const ClientDetails = defineComponent({
  name: "ClientDetails",
  setup() {
    const id = useRoute().params.id;
    const clientStore = useClientStore();
    const { client } = storeToRefs(clientStore);
    onBeforeMount(() => clientStore.getOneClient(Number(id)));

    const randomNumber = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);
    const randomByte = () => randomNumber(0, 255);
    const randomCssRgba = () =>
      `rgba(${[randomByte(), randomByte(), randomByte(), 0.2].join(",")})`;

    const [data, dates, products] = useStatsStore().getOrderedProduct(
      Number(id),
      storeToRefs(useInvoiceStore()).invoices.value
    );

    return () => (
      <main class="w-full h-full px-3">
        <div class="w-full h-full text-black flex  flex-col print:pr-12">
          <h1 class="font-semibold text-lg mb-1 text-gray-800 border-b-2 flex items-center border-b-gray-200 uppercase text-left">
            <UiIcon IsStyled={true} name={"person"} /> {client.value?.name}
          </h1>
          <ClientCard client={client.value} />
          <div class=" my-3  border-b-2 border-b-gray-200"></div>
          <ChartBar
            id="stock-mouvements-for-past-three-months"
            chartData={{
              labels: dates,
              datasets: products.map((product) => {
                const color = randomCssRgba();
                return {
                  label: product,
                  backgroundColor: color,
                  borderColor: color.replace("0.2", "0.5"),
                  data: data[product],
                  borderWidth: 2,
                };
              }),
            }}
            chartOptions={{
              responsive: true,
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "rgba(25,23,17,0.6)",
                    textStrokeWidth: 10,
                  },
                  border: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    lineWidth: 1,
                    drawBorder: false,
                  },
                  border: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
      </main>
    );
  },
});
