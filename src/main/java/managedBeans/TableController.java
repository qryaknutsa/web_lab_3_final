package managedBeans;

import java.io.*;
import java.net.URL;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TableController implements Serializable {
    private List<ResultBean> results;


    private float tempX;
    private String tempY;

    public void setTempY(String tempY) {
        this.tempY = tempY;
    }

    public String getTempY() {
        return tempY;
    }

    public TableController() {
    }

    private ResultBean result = new ResultBean();

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    private String errorMessage = "";

    public void setResult(ResultBean result) {
        this.result = result;
    }

    public void setResults(List<ResultBean> results) {
        this.results = results;
    }

    public void setTempX(float tempX) {
        this.tempX = tempX;
    }

    public float getTempX() {
        return tempX;
    }

    public ResultBean getResult() {
        return result;
    }

    //Соединение к базе данных
    public Connection getConnection() throws IOException {
        Connection connection = null;
        URL url = getClass().getResource("file.txt");
        File file = new File(url.getPath());
        FileReader fr = new FileReader(file);
        BufferedReader reader = new BufferedReader(fr);
        ArrayList<String> properties = new ArrayList<>();
        String line = reader.readLine();
        properties.add(line);
        while (line != null) {
            System.out.println(line);
            line = reader.readLine();
            properties.add(line);
        }

        String url_db = properties.get(0).split("=")[1].trim();
        String username_db = properties.get(1).split("=")[1].trim();
        String password_db = properties.get(2).split("=")[1].trim();

        try {
            connection = DriverManager.getConnection(url_db, username_db, password_db);
        } catch (SQLException e) {
            System.out.println("Не получилось...");
            e.printStackTrace();
            System.exit(-1);
        }
        return connection;
    }

    public List<ResultBean> getResults() throws IOException {

        ResultSet rs = null;
        PreparedStatement pst = null;
        Connection con = getConnection();
        String stm = "Select * from results"; //"select x, y, r, inArea from s336385.results"
        List<ResultBean> results = new ArrayList<ResultBean>();

        try {
            pst = con.prepareStatement(stm);
            pst.execute();
            rs = pst.getResultSet();

            while (rs.next()) {
                ResultBean resultBean = new ResultBean();
                resultBean.setX(rs.getDouble("x"));
                resultBean.setY(rs.getDouble("y"));
                resultBean.setR(rs.getDouble("r"));
                boolean res = rs.getBoolean("inarea");
                resultBean.setTime(rs.getDouble("comptime"));
                resultBean.setDate(rs.getString("curdate"));


                if (res) resultBean.setInArea("Попал");
                else resultBean.setInArea("Не попал");
                results.add(resultBean);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return results;
    }


    public String cleanTable() {
        try {
            System.out.println("CLEAN");
            result.checkArea();
            Connection connection = getConnection();
            PreparedStatement prepareStatement = connection.prepareStatement("delete from results");
            prepareStatement.execute();
        } catch (SQLException | IOException e) {
            System.out.println(e.getMessage());
        }
        return "main.xhtml?faces-redirect=true";
    }

    public void set_r1() {
        result.setR(1);
    }

    public void set_r2() {
        result.setR(2);
    }

    public void set_r3() {
        result.setR(3);
    }

    public void set_r4() {
        result.setR(4);
    }

    public void set_r5() {
        result.setR(5);
    }


    public void changeX() {
        float x = tempX / 10f;
        String str_X = String.format("%.1f", x).replaceAll(",", "\\.");
        result.setX(Double.parseDouble(str_X));
    }

    public String addResult() {
        //check value of Y
//        if(result.getY())
        if (tempY == null || tempY.isEmpty()) {
            errorMessage = "Введите число Y";
            return "main.xhtml?faces-redirect=true";
        }
        try {
            double y = Double.parseDouble(tempY);

            if (y <= -5 || y >= 5) {
                errorMessage = "Введите значение Y в пределах [-5, 5]";
                return "main.xhtml?faces-redirect=true";
            } else result.setY(y);
        } catch (NumberFormatException e) {
            errorMessage = "Введите число в поле Y";
            return "main.xhtml?faces-redirect=true";
        }
        try {
            System.out.println("ADD");
            result.checkArea();
            Connection connection = getConnection();
            PreparedStatement prepareStatement = connection.prepareStatement("insert into results(id, x, y, r, inarea, comptime, curdate) values(?, ?, ?, ?, ?, ?, ?)");
            prepareStatement.setDouble(1, 1);
            prepareStatement.setDouble(2, result.getX());
            prepareStatement.setDouble(3, result.getY());
            prepareStatement.setDouble(4, result.getR());

            if (result.getInArea().equals("Попал")) prepareStatement.setBoolean(5, true);
            else prepareStatement.setBoolean(5, false);

            prepareStatement.setDouble(6, result.getTime());
            prepareStatement.setString(7, result.getDate());
            prepareStatement.executeUpdate();
            connection.close();
        } catch (SQLException | IOException e) {
            System.out.println(e.getMessage());
        }
        errorMessage = "";
        return "main.xhtml?faces-redirect=true";
    }

}
