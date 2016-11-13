import BaseHTTPServer
import SimpleHTTPServer
import SocketServer
import os
import sys


class ThreadingSimpleServer(SocketServer.ThreadingMixIn,
                            BaseHTTPServer.HTTPServer):
  pass


if __name__ == '__main__':
  os.chdir("gh-pages")
  server = ThreadingSimpleServer(
               ('', 8000),
               SimpleHTTPServer.SimpleHTTPRequestHandler)

  print "Serving on port 8000"
  try:
    while True:
      sys.stdout.flush()
      server.handle_request()
  except KeyboardInterrupt:
      pass
