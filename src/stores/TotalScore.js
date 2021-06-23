import { derived } from 'svelte/store';
import { Hits } from './HitsStore';
import { Misses } from './MissesStore';

export const TotalScore = derived(
    [Hits, Misses],
    ([$Hits, $Misses], set) => set($Hits - $Misses)
);