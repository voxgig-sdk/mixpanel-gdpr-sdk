package core

type MixpanelGdprError struct {
	IsMixpanelGdprError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMixpanelGdprError(code string, msg string, ctx *Context) *MixpanelGdprError {
	return &MixpanelGdprError{
		IsMixpanelGdprError: true,
		Sdk:              "MixpanelGdpr",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MixpanelGdprError) Error() string {
	return e.Msg
}
