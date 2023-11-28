import { MINIMUM_AGE, generateProof } from '../lib/noirdemo';
import { createSignal, createResource } from 'solid-js';
import asd from 'qrcode';

export function EntrantPage() {
  const [age, setAge] = createSignal<number | undefined>(undefined);
  let canvasRef: HTMLCanvasElement | undefined;
  const [proof, obj] = createResource(age, async (ageN) => {
    const proof = await generateProof(ageN);
    console.log(proof);
    const hexProof = uint8ArrayToHex(proof.proof);
    asd.toCanvas(
      canvasRef,

      [{ data: proof.proof, mode: 'byte' }],
      {
        errorCorrectionLevel: 'L',
        margin: 1,
        scale: 1,
        width: 600,
      },
    );
    return { proof: proof.proof, hexProof, publicInputs: proof.publicInputs };
  });

  console.log(asd);

  return (
    <div class="text-black bg-white p-10 rounded-lg shadow-lg text-center">
      <h1 class="text-2xl font-bold mb-4">ENTRANT</h1>
      <div class="mb-4">
        <label for="age" class="block text-lg mb-2">
          ENTER AGE
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={age()}
          class="border-2 border-gray-300 rounded-lg p-2 w-full text-white focus:outline-none focus:border-purple-500"
          placeholder="Enter your age"
          onChange={(e) => {
            const age = parseInt(e.currentTarget.value);
            setAge(age);
          }}
        />
      </div>
      <button
        class="bg-purple-600 text-white text-lg rounded-lg px-6 py-2 w-full hover:bg-purple-700 focus:outline-none"
        onClick={async () => {
          obj.refetch();
        }}
      >
        GENERATE PROOF
      </button>
      {proof.state === 'errored' && <p class="text-gray-500">Errored...</p>}
      {proof.state === 'pending' && <p class="text-gray-500">Generating...</p>}
      {proof.state === 'refreshing' && (
        <p class="text-gray-500">Refreshing...</p>
      )}
      {proof.state === 'unresolved' && <div />}
      <div class="flex flex-col items-center">
        {proof.state === 'ready' && proof.latest.proof && (
          <>
            <div>Age: {age()}</div>
            <div>Minimal age: {MINIMUM_AGE}</div>
            <div class="break-all overflow-auto px-20 my-10 h-20">
              Proof: {proof.latest.hexProof}
            </div>
          </>
        )}
        <canvas
          id="canvas"
          ref={canvasRef}
          style={{ width: '700px', height: '700px' }}
        />
      </div>
    </div>
  );
}

export function uint8ArrayToHex(uint8array: Uint8Array) {
  return Array.from(uint8array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
