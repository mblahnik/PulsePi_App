import java.io.IOException;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Random;

/**
 * Since we no longer are able to pass around the arduino I made this program to
 * simulate it. This program runs forever. Remeber to stop it in the console (I
 * usually just close the terminal to exit). If you are getting JVM bind errors
 * that means you already have an instance of this running.
 */
public class FakeArduino {
    public static void main(String[] args) throws IOException {
        final int SERVER_PORT = 23;

        ServerSocket serv = new ServerSocket(SERVER_PORT);
        System.out.println("Starting Server on port " + SERVER_PORT);
        for (;;) {
            Socket sock = serv.accept();

            System.out.println("Client Accepted");

            new ClientHandler(sock);
        }
    }

    public static class ClientHandler {
        private Socket client;
        private Thread thread;
        private PrintWriter output;

        public ClientHandler(Socket sock) throws IOException {
            this.client = sock;
            this.output = new PrintWriter(this.client.getOutputStream(), true);
            thread = new Thread(() -> HandleClient());
            thread.start();
        }

        private void HandleClient() {
            for (;;) {
                try {
                    thread.sleep(5000);
                    this.output.println(getHeartBeat());
                } catch (Exception e) {
                    try {
                        this.client.close();
                        this.thread.stop();
                    } catch (Exception d) {
                    }
                }
            }
        }

        private int getHeartBeat() {
            int maxBPM = 155;
            int minBPM = 55;
            Random r = new Random();
            return r.nextInt((maxBPM - minBPM) + 1) + minBPM;
        }
    }
}