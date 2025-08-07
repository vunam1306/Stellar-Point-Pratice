<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
  import { computed, ref, onMounted } from 'vue';
  import axios from 'axios';

// URL backend API
const API_URL = 'http://localhost:3000/pets';

//Reactive variable to store the list of pets from the API
const pets = ref([]);

// property to hold new pet data
const newPet = ref({
  name: '',
  weight: null,
  type: ''
});

// --- FUNCTIONS ---

// function to fetch pets from the API
async function fetchPets() {
  try {
    const response = await axios.get(API_URL);
    pets.value = response.data; // update the pets list with the data from the API
    console.log("Fetched pets:", response.data);
  } catch (error) {
    console.error("Error fetching pets:", error);
    alert("Could not fetch pet data from the server.");
  }
}

// function to add a new pet
async function addPet() {
  // check input values
  if (!newPet.value.name || !newPet.value.weight || !newPet.value.type) {
    alert("Please fill in all fields.");
    return;
  }
  
  try {
    const petToAdd = {
      petName: newPet.value.name,
      petWeight: newPet.value.weight,
      petType: newPet.value.type
    };

    // send POST request to the API
    await axios.post(API_URL, petToAdd);
    
    // Reset the form fields
    newPet.value = { name: '', weight: null, type: '' };

    // reload the pets list
    await fetchPets(); 
  } catch (error) {
    console.error("Error adding pet:", error);
    alert("Failed to add the new pet.");
  }
}
 
const isSummaryVisible = ref(false);

// function control to toggle summary visibility
function toggleSummary() {
  isSummaryVisible.value = !isSummaryVisible.value;
}

// --- COMPUTED PROPERTIES FOR SUMMARY ---

// total count of pets
const totalCount = computed(() => pets.value.length);

// avarage weight of all pets
const avgWeight = computed(() => {
  if (totalCount.value === 0) return 0;
  const totalWeight = pets.value.reduce((sum, pet) => sum + pet.weight, 0);
  return totalWeight / totalCount.value;
});


// Count of pets by type (Dog, Cat, Bird)
const dogCount = computed(() => pets.value.filter(pet => pet.type === 'dog').length);
const catCount = computed(() => pets.value.filter(pet => pet.type === 'cat').length);
const birdCount = computed(() => pets.value.filter(pet => pet.type === 'bird').length);


// call fetchPets() when component loaded 
onMounted(() => {
  fetchPets();
});
</script>


  <template>
    <header>
    <h1>Pet Store Inventory</h1>
  </header>

  <main>
    <form @submit.prevent="addPet" class="form">
    <label for="petName">Name:</label>    
    <input type="text" name="petName"  placeholder="input pet name" v-model="newPet.name" >
    
    <label for="petWeight">Weight (kg):</label>
    <input type="number" name="petWeight" placeholder="input pet weight" v-model="newPet.weight">

    <label for="petType">Type:</label>
    <select name="petType" id="" v-model="newPet.type">
        <option value="" disabled selected>--Select a pet type--</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
    </select>
    <input type="submit" value="Add">
    </form>

    <table class="table">
      <thread>
        <tr>
            <th class="headerTable">ID</th>
            <th class="headerTable">Name</th>
            <th class="headerTable">Weight(kg)</th>
            <th class="headerTable">Type</th>
        </tr>
      </thread>
      <tbody>
        <tr v-for="pet in pets" :key="pet.id">
            <th>{{ pet.id }}</th>
            <th>{{ pet.name }}</th>
            <th>{{ pet.weight }}</th>
            <th>{{ pet.type }}</th>
        </tr>
      </tbody>
    </table>
    

  <button @click="toggleSummary" class="summaryButton">
    {{ isSummaryVisible ? 'Hide Summary' : 'Show Summary' }}
  </button>

  <div v-if="isSummaryVisible" class="summary">
      <div><span>Total Pets:</span> {{ totalCount }}</div>
      <div><span>Average Weight:</span> {{ avgWeight.toFixed(2) }} kg</div>
      <div><span>Dogs:</span> {{ dogCount }}</div>
      <div><span>Cats:</span> {{ catCount }}</div>
      <div><span>Birds:</span> {{ birdCount }}</div>
  </div>

  </main>
  </template>
 
<style scoped>
  template {
    display: flex;
  };
  header {
    padding: 20px;
    text-align: center;
  }

  h1 {
    color: #343a40;
  }

  .form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    color: black;
  }

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  
  input, select {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ced4da;
  }

  .table {
    margin-top: 50px;
    width: auto;
    color: black;
    border: 1px solid #343a40;
    display: flex;
    flex-direction: column;
  }

  .headerTable  {
    border: 1px solid #343a40;
    background-color: #ced4da;
    width: 100px;
  }

  .table tbody th {
    width: 100px;
    text-align: center;
  }
  .summaryButton {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .summary {
    color: black;
    padding: 50px;
  }
</style>
