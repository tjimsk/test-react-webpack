FROM golang:1.12

ENV GOBIN=/go/bin
ENV PORT=:8080
ENV STATIC=/etc/static
ENV INSTALLDIR=/go/apps/static

EXPOSE 8080
COPY production $STATIC
COPY server/vendor $GOPATH/src
COPY server/main.go $INSTALLDIR/main.go

WORKDIR $INSTALLDIR
RUN go build -o $GOBIN/static .

ENTRYPOINT $GOBIN/static
