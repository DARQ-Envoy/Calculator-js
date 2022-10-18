
def showequa(provided):
    equations = {}
    for equa in provided:
        eq = {}
        eq["equation"] = equa.equation
        time = equa.created
        eq["date-created"] = str(time.date())
        equations[f"{equa.id}"]= eq
    return equations