//package validators;
//
//
//import jakarta.faces.application.FacesMessage;
//import jakarta.faces.component.UIComponent;
//import jakarta.faces.context.FacesContext;
//import jakarta.faces.validator.Validator;
//import jakarta.faces.validator.ValidatorException;
//
////@FacesValidator("yValidator")
//public class YValidator implements Validator {
//    private double Y;
//
//    void sendError() {
//        FacesMessage msg = new FacesMessage("Invalid Y value.");
//        msg.setSeverity(FacesMessage.SEVERITY_ERROR);
//        throw new ValidatorException(msg);
//    }
//
//    @Override
//    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
//        if (o == null) sendError();
//        else {
//            try {
//                Y = Double.parseDouble(o.toString());
//            } catch (NumberFormatException e) {
//                sendError();
//            }
//            if (Y > 4 || Y < -4) sendError();
//        }
//    }
//}
