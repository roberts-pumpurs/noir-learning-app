import { createSignal } from 'solid-js';
import { verifyProof } from '../lib/noirdemo';
import { ProofData } from '@noir-lang/noir_js';

export function BouncerPage() {
  const [proof, setProof] = createSignal<Uint8Array | undefined>(undefined);
  const [error, setError] = createSignal<string | undefined>(undefined);
  const [valid, setValid] = createSignal<boolean | undefined>(undefined);

  return (
    <div class="text-black bg-purple-600 p-6 rounded-lg text-center">
      <div class="text-3xl text-white mb-4">BOUNCER</div>
      <div class="bg-white p-10 rounded-lg">
        <div class="text-5xl font-bold text-purple-600">SCAN PROOF</div>
        <div class="text-8xl font-bold text-gray-500 mb-4">📸</div>
      </div>

      <div class="mb-4">
        <label for="age" class="block text-lg mb-2">
          Or enter by hand
        </label>
        <input
          type="string"
          id="proof"
          name="proof"
          class="border-2 border-gray-300 rounded-lg p-2 w-full text-white focus:outline-none focus:border-purple-500"
          placeholder="Enter hex proof manually"
          onChange={(e) => {
            console.log(e.currentTarget.value);
            setError(undefined);
            setValid(undefined);
            try {
              const proof = hexToUint8Array(e.currentTarget.value);
              console.log('proof', proof);
              setProof(proof);
            } catch (e: any) {
              console.error(e);
              setError(e);
            }
          }}
        />
      </div>

      {error() && <p class="text-gray-500">Error: {error()}</p>}
      {proof() && (
        <button
          onClick={async () => {
            const p = proof();
            if (p) {
              const proofData: ProofData = {
                proof: p,
                publicInputs: [
                  Uint8Array.from([
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
                  ]),
                ],
              };
              console.log('proofData', proofData);
              const proofIsValid = await verifyProof(proofData);
              if (proofIsValid) setValid(proofIsValid);
              else setError('Invalid proof');
            }
          }}
          class="bg-white text-purple-600 text-center py-4 rounded-lg w-64"
        >
          Validate
        </button>
      )}
      {valid() && <p class="text-gray-500">Valid proof!</p>}
    </div>
  );
}

function hexToUint8Array(hexString: string) {
  const bytes = new Uint8Array(hexString.length / 2);

  for (let i = 0, j = 0; i < hexString.length; i += 2, j++) {
    bytes[j] = parseInt(hexString.substr(i, 2), 16);
  }

  return bytes;
}
