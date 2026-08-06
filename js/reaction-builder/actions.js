function updateComponentName(id, value) {

    const component = components.find(c => c.id == id);

    if (!component) return;

    component.name = value;

}
