export function EndState(reason, gamemode, time) {
    return {
        gamemode: gamemode,
        reason: reason,
        endTime: time
    }
}