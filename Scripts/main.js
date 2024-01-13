nova.commands.register("tower.runTower", (_) => {
  if (!nova.workspace.path) {
    nova.workspace.showInformativeMessage(
      nova.localize("This workspace has no path for Tower to open.")
    );
    return;
  }

  var process = new Process("/usr/bin/open", {
    args: ["-a", "Tower", "--args", "gittower", nova.workspace.path],
  });

  var lines = [];
  process.onStderr(function (data) {
    if (data) {
      lines.push(data);
    }
  });

  process.onDidExit(function (status) {
    if (status != 0) {
      nova.workspace.showInformativeMessage(
        nova.localize("Error Launching Tower:") + "\n\n" + lines.join("")
      );
    }
  });

  process.start();
});
