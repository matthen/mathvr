"""Store the visualizations."""

class Visualization(object):
  def __init__(self, name, title, description):
    self.name = name
    self.title = title
    self.description = description


VISUALIZATIONS = [
  Visualization(name="conic",
                title="Conic sections",
                description="""
                Shine a flashlight to create circles, ellipses, parabolas and
                hyperbolas. The cone of light is intersected by the plane below.
                """),
  Visualization(name="lattice",
                title="Cubic lattices",
                description="""
                  See what it is like inside a lattice of spheres. Move around
                  and try to find interesting patterns.
                """),
  Visualization(name="buckyball",
                title="Buckyballs",
                description="A simple demo showing two bucky balls."),
]
