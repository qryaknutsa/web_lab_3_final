package managedBeans;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ResultBean implements Serializable {

    private double x;
    private double y;
    private double r;
    private String inArea;
    private double time;
    private String date;

    public ResultBean() {
        this.x = 0;
        this.y = 0;
        this.r = 1;
        this.inArea = "";
        this.time = 0;
        this.date = "";
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setInArea(String inArea) {
        this.inArea = inArea;
    }

    public void setTime(double time) {
        this.time = time;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getInArea() {
        return inArea;
    }

    public double getTime() {
        return time;
    }

    public String getDate() {
        return date;
    }



    public void checkArea() {
        double currentTime = System.nanoTime();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        date = LocalDateTime.now().format(formatter);
        time = (System.nanoTime() - currentTime) / 1e6;
        if ((x >= 0 && y >= 0) && (x <= r) && (y <= (r / 2))) {
            inArea = "Попал";
        } else if (x >= 0 && y <= 0 && y >= (x - r)) {
            inArea = "Попал";
        } else if (x <= 0 && y >= 0 && r * r >= y * y + x * x) {
            inArea = "Попал";
        } else {
            inArea = "Не попал";
        }
    }
}

