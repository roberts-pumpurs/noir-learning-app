import {
  BarretenbergBackend,
  CompiledCircuit,
  ProofData,
} from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import noir_demo from '../../circuits/target/main.json';

const backend = new BarretenbergBackend(noir_demo as CompiledCircuit);
export const AgeVerifier = new Noir(noir_demo as CompiledCircuit, backend);
export const MINIMUM_AGE = 18;

export async function generateProof(age: number): Promise<ProofData> {
  return AgeVerifier.generateFinalProof({
    age_of_person: age,
    minimum_age: MINIMUM_AGE,
  });
}

export async function verifyProof(proof: ProofData): Promise<boolean> {
  return AgeVerifier.verifyFinalProof(proof);
}
