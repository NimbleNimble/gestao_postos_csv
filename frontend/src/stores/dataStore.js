import { ref } from "vue";
import { getData } from "../services/dataService";

const dataContent = ref([]);

export function dataStore() {
  const loadDataContent = () => {
    getData().then((data) => {
      mutationDataContent(data.data);
    });
  };

  function mutationDataContent(newData) {
    dataContent.value = newData;
  }

  return { dataContent, mutationDataContent, loadDataContent };
}

export default dataStore;
