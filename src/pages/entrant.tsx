export function EntrantPage() {
  return (
    <div class="bg-white p-10 rounded-lg shadow-lg text-center">
      <h1 class="text-2xl font-bold mb-4">ENTRANT</h1>
      <div class="mb-4">
        <label for="age" class="block text-lg mb-2">
          ENTER AGE
        </label>
        <input
          type="text"
          id="age"
          name="age"
          class="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-purple-500"
          placeholder="Enter your age"
        />
      </div>
      <button class="bg-purple-600 text-white text-lg rounded-lg px-6 py-2 w-full hover:bg-purple-700 focus:outline-none">
        GENERATE PROOF
      </button>
    </div>
  );
}
