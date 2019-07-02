package com.fankun.factory.entity;


public class TransactionEntity extends BaseBean{

		/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		private int id;
		private String traceMessageId;
		private String transactionId;
		private String systemId;
		private String version;
		private String responseCode;
		private String requestBody;
		private String responseBody;

		private String createBy;
		private String updateBy;
		private int userId;
		private int transType;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getTraceMessageId() {
			return traceMessageId;
		}
		public void setTraceMessageId(String traceMessageId) {
			this.traceMessageId = traceMessageId;
		}
		public String getTransactionId() {
			return transactionId;
		}
		public void setTransactionId(String transactionId) {
			this.transactionId = transactionId;
		}
		public String getSystemId() {
			return systemId;
		}
		public void setSystemId(String systemId) {
			this.systemId = systemId;
		}
		public String getVersion() {
			return version;
		}
		public void setVersion(String version) {
			this.version = version;
		}
		public String getResponseCode() {
			return responseCode;
		}
		public void setResponseCode(String responseCode) {
			this.responseCode = responseCode;
		}
		public String getRequestBody() {
			return requestBody;
		}
		public void setRequestBody(String requestBody) {
			this.requestBody = requestBody;
		}
		public String getResponseBody() {
			return responseBody;
		}
		public void setResponseBody(String responseBody) {
			this.responseBody = responseBody;
		}
		public String getCreateBy() {
			return createBy;
		}
		public void setCreateBy(String createBy) {
			this.createBy = createBy;
		}
		public String getUpdateBy() {
			return updateBy;
		}
		public void setUpdateBy(String updateBy) {
			this.updateBy = updateBy;
		}
		public int getUserId() {
			return userId;
		}
		public void setUserId(int userId) {
			this.userId = userId;
		}
		public int getTransType() {
			return transType;
		}
		public void setTransType(int transType) {
			this.transType = transType;
		}

}
