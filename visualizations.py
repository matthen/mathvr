"""Store the visualizations."""

class Visualization(object):
  def __init__(self, name, title, description):
    self.name = name
    self.title = title
    self.description = description


VISUALIZATIONS = [
  Visualization(name="lattice",
                title="Cubic lattices",
                description="Blah blah"),
  Visualization(name="buckyball",
                title="Buckyballs",
                description="Blah blah"),
]
