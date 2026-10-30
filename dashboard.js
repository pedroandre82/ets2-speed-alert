Funbit.Ets.Telemetry.Dashboard.prototype.filter = function (data, utils) {
    // A velocidade já vem em km/h, apenas arredondamos
    const rawSpeedLimit = data.navigation && data.navigation.speedLimit ? data.navigation.speedLimit : 0;
    data.navigation.speedLimitKmh = Math.round(rawSpeedLimit);
    return data;
};

var previousSpeedLimit = -1;
var alertTimeout = null;

function triggerAlertEffect() {
    var speedSignElement = document.getElementById('speed-sign');
    if (speedSignElement) {
        speedSignElement.classList.add('alert-glow');

        if (alertTimeout) {
            clearTimeout(alertTimeout);
        }

        alertTimeout = setTimeout(function () {
            speedSignElement.classList.remove('alert-glow');
        }, 2000);
    }
}

Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {
    const currentLimit = data.navigation.speedLimitKmh;
    const speedValueElement = document.getElementById('speed-limit-value');

    if (speedValueElement) {
        speedValueElement.innerText = currentLimit > 0 ? currentLimit.toString() : '--';

        // Detecta alteração automática no limite de velocidade da via
        if (previousSpeedLimit !== -1 && previousSpeedLimit !== currentLimit && currentLimit > 0) {
            triggerAlertEffect();
        }

        previousSpeedLimit = currentLimit;
    }
};

Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {
    // Evento de clique no botão provisório de teste
    var testButton = document.getElementById('btn-test-glow');
    if (testButton) {
        testButton.addEventListener('click', function (e) {
            e.stopPropagation();
            triggerAlertEffect();
        });
    }
};