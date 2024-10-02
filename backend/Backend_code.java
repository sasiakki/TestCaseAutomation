import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Servlet mapped to /login
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Hardcoded credentials for demonstration
    private final String USERNAME = "admin";
    private final String PASSWORD = "password123";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Get form data from the request
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // Set response type
        response.setContentType("text/html");

        // Validate credentials
        PrintWriter out = response.getWriter();
        if (USERNAME.equals(username) && PASSWORD.equals(password)) {
            // Success message
            out.println("<html><body>");
            out.println("<h1>Login Successful!</h1>");
            out.println("<p>Welcome, " + username + "!</p>");
            out.println("</body></html>");
        } else {
            // Failure message
            out.println("<html><body>");
            out.println("<h1>Login Failed</h1>");
            out.println("<p>Invalid username or password. Try again.</p>");
            out.println("<a href=\"login.html\">Go Back to Login</a>");
            out.println("</body></html>");
        }
    }
}
