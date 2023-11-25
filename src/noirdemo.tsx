import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import noir_demo from '../circuits/target/main.json';
import { createSignal, createEffect } from 'solid-js';

export function NoirDemo() {
  createEffect(async () => {
    const backend = new BarretenbergBackend(noir_demo as any);
    const noir = new Noir(noir_demo as any, backend);
    const input = { age_of_person: 1, minimum_age: 1 };
    // display('logs', 'Generating proof... ⌛');
    const proof = await noir.generateFinalProof(input);
    console.log("proof", proof);
    // display('logs', 'Generating proof... ✅');
    // display('results', proof.proof);
    // display('logs', 'Verifying proof... ⌛');
    const verification = await noir.verifyFinalProof(proof);
    console.log('verification', verification);
    // if (verification) display('logs', 'Verifying proof... ✅');
  });
  return (
    <div>
      <h1>Noir Demo</h1>
      <div id="logs"></div>
      <div id="results"></div>
    </div>
  );
}

// document.addEventListener('DOMContentLoaded', async () => {
//   const backend = new BarretenbergBackend(noirjs_demo);
//   const noir = new Noir(noirjs_demo, backend);
//   const input = { age_of_person: 1, minimum_age: 1 };
//   display('logs', 'Generating proof... ⌛');
//   const proof = await noir.generateFinalProof(input);
//   display('logs', 'Generating proof... ✅');
//   display('results', proof.proof);
//   display('logs', 'Verifying proof... ⌛');
//   const verification = await noir.verifyFinalProof(proof);
//   if (verification) display('logs', 'Verifying proof... ✅');
// });

// function display(container, msg) {
//   const c = document.getElementById(container);
//   const p = document.createElement('p');
//   p.textContent = msg;
//   c.appendChild(p);
// }
