import cssprefixer
from django.template import Context  # use django just for templates
from django.template.loader import get_template
from django.conf import settings
import logging
import os
import shutil
import slimit
import sys

from visualizations import VISUALIZATIONS


def MinifyCSS():
  """Creates a minified style-sheet, from all the *.css files.

  Also adds vendor prefixes to rules."""
  css = []
  min_css = []
  for fname in os.listdir("css"):
    if not fname.endswith(".css"):
      continue
    with open(os.path.join("css", fname), "r") as f:
      if fname.endswith(".min.css"):
        min_css.append(f.read())
      else:
        css.append(f.read())

  css_to_min = "\n".join(css)
  minified = cssprefixer.process(css_to_min, minify=True).encode('utf-8')
  minified += "\n" + "\n".join(min_css)
  with open("../gh-pages/css/style.min.css", "w") as f:
    f.write(minified)
  print "Wrote ../gh-pages/css/style.min.css"

def BuildJS():
  """Build js libraries."""
  # First, minify and copy over vr.js.
  with open("js/vr.js", "r") as f:
    js = f.read()
  with open("../gh-pages/js/vr.min.js", "w") as f:
     f.write(slimit.minify(js))
  print "Wrote ../gh-pages/js/vr.min.js"

  # Copy the other javascript libraries.
  for fname in ["three.min.js", "material.min.js", "dialog-polyfill.min.js"]:
    shutil.copy("js/" + fname, "../gh-pages/js/" + fname)
    print "Wrote ../gh-pages/js/" + fname



def CreateIndexPage():
  t = get_template("index.html")
  c = Context({
    "root_dir": ".",
    "visualizations": VISUALIZATIONS
  })
  with open("../gh-pages/index.html", "w") as f:
    f.write(t.render(c))
  print "Wrote ../gh-pages/index.html"

  t = get_template("about.html")
  with open("../gh-pages/about.html", "w") as f:
    f.write(t.render(Context({"root_dir": "."})))
  print "Wrote ../gh-pages/about.html"


def CreateVisualizationPages():
  t = get_template("visualization.html")
  for visualization in VISUALIZATIONS:
    c = Context({"visualization": visualization, "root_dir": ".."})
    html = t.render(c)
    fname = "../gh-pages/vis/" + visualization.name + ".html"
    with open(fname, "w") as f:
      f.write(html)
    print "Wrote", fname

    js_file = "js/" + visualization.name + ".js"
    shutil.copy(js_file, "../gh-pages/" + js_file)
    print "Wrote ../gh-pages/" + js_file

    image = "images/" + visualization.name + ".png"
    shutil.copy(image, "../gh-pages/" + image)
    print "Wrote ../gh-pages/" + image


if __name__ == '__main__':
  rule = "all"
  if len(sys.argv) > 1:
    rule = sys.argv[-1]

  rules = ["css", "viz", "js", "index", "all"]

  if rule not in rules:
    raise ValueError("rule must be one of: {}".format(", ".join(rules)))

  # Configure django templating.
  settings.configure(TEMPLATE_DIRS=("templates",))

  if rule in ["css", "all"]:
    MinifyCSS()

  if rule in ["js", "all"]:
    BuildJS()

  if rule in ["index", "all"]:
    CreateIndexPage()

  if rule in ["viz", "all"]:
    CreateVisualizationPages()
