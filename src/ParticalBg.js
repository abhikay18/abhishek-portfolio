import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";

function ParticalBg({ id }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) return;

    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, [init]);

  return (
    <div>
      {init && <Particles id={id} options={particlesOptions} />}
    </div>
  );
}

export default ParticalBg;
