import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentAbilityFetch, currentAbilityId } from "../atoms";
import { capitalize } from "../methods";

export default function Ability() {
  const { abilityId } = useParams();
  const setAbility = useSetRecoilState(currentAbilityId);
  const ability = useRecoilValue(currentAbilityFetch);

  useEffect(() => {
    if (abilityId && !isNaN(Number(abilityId))) {
      setAbility(Number(abilityId));
    }
  }, [abilityId, setAbility]);

  if (!ability && ability !== 0) return null;

  return (
    <div>
      <h2>{capitalize(ability.name)}</h2>
    </div>
  );
}
