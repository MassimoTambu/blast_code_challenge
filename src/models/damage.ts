import { HitGroupKinds } from './enums';

export interface Damage {
  armament: string;
  damageHealth: number;
  /**
   * For some reason, damage_armor logs have 1 unit number less than the armor logs results:
   *
   * `(damage "28") (damage_armor "9") (health "72") (armor "90")`
   *
   * "damage_armor" should be 10
   */
  damageArmor: number;
  remainingHealth: number;
  remainingArmor: number;
  hitgroup: HitGroupKinds;
}
