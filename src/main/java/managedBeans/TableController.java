package managedBeans;

import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TableController implements Serializable {
    private List<ResultBean> results;
    private float tempX;

    public TableController() {
    }

    private String tempY;

    public void setTempY(String tempY) {
        this.tempY = tempY;
    }

    public String getTempY() {
        return tempY;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    private String errorMessage = "";
    private ResultBean result = new ResultBean();

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

        String url = "";
        String username = "";
        String password = "";


        try {
            connection = DriverManager.getConnection(url, username, password);
        } catch (SQLException e) {
            System.out.println("Не получилось подключиться...");
            e.printStackTrace();
            System.exit(-1);
        }
        return connection;
    }

    public List<ResultBean> getResults() throws IOException {

        ResultSet rs = null;
        PreparedStatement pst = null;
        Connection con = getConnection();
        String stm = "Select * from results";
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


    public void cleanTable() {
        try {
            System.out.println("CLEAN");
            Connection connection = getConnection();
            PreparedStatement prepareStatement = connection.prepareStatement("delete from results");
            prepareStatement.execute();
        } catch (SQLException | IOException e) {
            System.out.println(e.getMessage());
        }
    }


    public void changeX() {
        float x = tempX / 10f;
        String str_X = String.format("%.1f", x).replaceAll(",", "\\.");
        result.setX(Double.parseDouble(str_X));
    }


    public void addResult() {
        if (tempY == null || tempY.isEmpty()) {
            errorMessage = "Введите значение Y";
        } else {
            try {
                String y2 = tempY.replace(',', '.');
                double y1 = Double.parseDouble(y2);
                if (y1 <= -5 || y1 >= 5) {
                    errorMessage = "Введите значение Y в пределах [-5, 5]";
                    return;
                } else {
                    double scale = 10;
                    double y = Math.ceil(y1 * scale) / 10f;
                    result.setY(y);
                }
            } catch (NumberFormatException e) {
                errorMessage = "Введите число в поле Y";
                return;
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
                errorMessage = "";
            } catch (SQLException | IOException e) {
                System.out.println(e.getMessage());
            }
        }
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

}
