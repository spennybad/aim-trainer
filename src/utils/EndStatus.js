export function EndStatus(reason, gamemode, time) {
    return {
        gamemode: gamemode,
        reason: reason,
        endTime: time
    }
}